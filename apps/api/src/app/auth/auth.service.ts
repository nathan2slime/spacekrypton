import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppI18nLang, i18n } from '@kry/i18n';
import { compare } from 'bcryptjs';
import { logger } from '@kry/logger';

import UserService from '../user/user.service';
import TokenService from './token/token.service';
import UserSecretService from '../user_secret/user_secret.service';
import EmailService from '../email/email.service';

import { User } from '../models/user.model';
import { UserSocial } from '../models/user_social.model';
import { UserStatusEnum } from '../models/enums/user_status';

import {
  SocialSignInInput,
  SignInInput,
  SignUpInput,
  ConfirmAccountInput,
  ChangePasswordInput,
} from './auth.types';
import { Success } from '../app.types';
import { UserToken } from '../models/user_token.model';
import { UserTokenEnum } from '../models/enums/user_token';
import { UserSecret } from '../models/user_secret.model';

@Injectable()
export default class AuthService {
  constructor(
    @InjectRepository(UserToken)
    private readonly userTokenRepository: Repository<UserToken>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(UserSocial)
    private readonly userSocialRepository: Repository<UserSocial>,
    private readonly userService: UserService,
    private readonly userSecretService: UserSecretService,
    private readonly tokenService: TokenService,
    private readonly emailService: EmailService
  ) {}

  async social(data: SocialSignInInput, lang: AppI18nLang) {
    logger.info('starting social login');
    const userSocial = await this.userSocialRepository.findOne({
      where: {
        secret: data.secret,
        type: data.type,
      },
      relations: {
        user: true,
      },
    });

    if (userSocial && userSocial.user) {
      logger.info('social account link found', userSocial);
      return await this.signinSocial(userSocial, data, lang);
    } else {
      logger.info('social account link not found');
      return await this.signupSocial(data, lang);
    }
  }

  async confirmAccount(payload: ConfirmAccountInput, lang: AppI18nLang) {
    logger.info('starting email confirmation');
    const id = payload.user;
    const isValid = await this.userSecretService.validate(payload, lang);
    logger.info('confirmation code validity', isValid);
    if (isValid) {
      await this.userRepository.save({
        id,
        confirmed: true,
      });

      const user = await this.userRepository.findOne({
        where: { id },
        relations: {
          token: true,
          roles: true,
          social: true,
        },
      });

      user.token = user.token.filter(
        ({ type }) => type == UserTokenEnum.AUTHORIZATION
      );

      logger.info('user email has been confirmed', user);

      return user;
    }
  }

  async sendAccountConfirmationEmail(id: number, lang: AppI18nLang) {
    const user = await this.userService.getById(id);
    const expired = await this.userSecretService.expired(user);

    if (!user) throw new Error(i18n[lang].err.userNotFound);

    if (!user.confirmed && expired) {
      const userSecret = await this.userSecretService.create(user);

      await this.emailService.sendAccountConfirmationEmail(
        user.email,
        userSecret,
        lang
      );
    }

    return { success: true } as Success;
  }

  async generateAuthToken(user: User) {
    if (user.token) {
      await Promise.all(
        user.token.map(
          async token =>
            token.type == UserTokenEnum.AUTHORIZATION && (await token.remove())
        )
      );
    }

    const authToken = await this.userTokenRepository
      .create({
        secret: this.tokenService.generate(user.id),
        type: UserTokenEnum.AUTHORIZATION,
        user,
      })
      .save();

    return authToken;
  }

  async changePassword(
    data: ChangePasswordInput,
    token: string,
    lang: AppI18nLang
  ) {}

  async requestPasswordChange(
    email: string,
    lang: AppI18nLang
  ): Promise<Success> {
    const user = await this.userRepository.findOne({
      where: { email, status: UserStatusEnum.ACTIVE },
    });

    if (!user) throw new Error(i18n[lang].err.userNotFound);

    const tokens = await this.userTokenRepository.find({
      where: { type: UserTokenEnum.UPDATE_PASSWORD },
    });
    await this.userTokenRepository.remove(tokens);

    const { secret } = await this.userTokenRepository
      .create({
        secret: this.tokenService.generate(user.id, 1800),
        user,
        type: UserTokenEnum.UPDATE_PASSWORD,
      })
      .save();

    this.emailService.sendRequestPasswordChange(
      user.email,
      {
        secret,
        user,
      } as UserSecret,
      lang
    );

    return { success: true };
  }

  async signinSocial(
    userSocial: UserSocial,
    data: SocialSignInInput,
    lang: AppI18nLang
  ) {
    const id = userSocial.user.id;
    const isValidConnection = userSocial.user.email == data.email;

    if (isValidConnection) {
      const user = await this.userService.getById(id);

      user.avatar = data.avatar;
      user.email = data.email;

      await this.userRepository.save(user);

      user.token = [await this.generateAuthToken(user)];

      return user;
    }

    throw new Error(i18n[lang].err.accountHasAlreadyBeenLinked);
  }

  async signupSocial(data: SocialSignInInput, lang: AppI18nLang) {
    const payload = {
      email: data.email,
      username: data.username,
      avatar: data.avatar,
      confirmed: true,
      status: UserStatusEnum.PENDING_PASSWORD,
    } as User;

    const exists = await this.userRepository.findOne({
      where: { email: data.email },
    });

    const user = exists
      ? await this.userRepository.save({ ...exists, ...payload })
      : await this.userRepository.create(payload).save();

    const connected = await this.userSocialRepository.findOne({
      where: { user: { id: user.id } },
    });

    if (!connected) {
      const userSocial = this.userSocialRepository.create({
        user,
        type: data.type,
        secret: data.secret,
      });

      await this.userSocialRepository.save(userSocial);
    }

    await this.userRepository.save(user);

    user.token = [await this.generateAuthToken(user)];

    return user;
  }

  async auth(token: string, lang: AppI18nLang) {
    const err = Error(i18n[lang].err.sessionExpired);

    try {
      const res = this.tokenService.decode(token);

      const id = res?.id;
      if (!id) throw err;

      const user = await this.userService.getById(id);
      if (!user) throw err;

      const auth = user.token.find(
        ({ type }) => type == UserTokenEnum.AUTHORIZATION
      );

      user.token = [auth];

      if (!auth) throw err;
      if (token == auth.secret) return user;

      throw err;
    } catch (_) {
      throw err;
    }
  }

  async signup(data: SignUpInput, lang: AppI18nLang) {
    const user = await this.userService.create(data as User, lang);

    const authToken = await this.generateAuthToken(user);
    user.token = [authToken];
    await this.userRepository.save(user);

    return user;
  }

  async login(data: SignInInput, lang: AppI18nLang) {
    const user = await this.userRepository.findOne({
      where: {
        email: data.email,
      },
    });

    if (!user || !user.password) throw new Error(i18n[lang].err.userNotFound);

    const isValidPassword = await compare(data.password, user.password);
    if (!isValidPassword) throw new Error(i18n[lang].err.invalidCredentials);

    await this.userRepository.save(user);

    user.token = [await this.generateAuthToken(user)];

    return user;
  }
}
