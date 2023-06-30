import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppI18nLang, i18n } from '@kry/i18n';
import { compare } from 'bcryptjs';

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
} from './auth.types';
import { Success } from '../app.types';

@Injectable()
export default class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(UserSocial)
    private readonly userSocialRepository: Repository<UserSocial>,
    private readonly userService: UserService,
    private readonly userSecretService: UserSecretService,
    private readonly authTokenService: TokenService,
    private readonly emailService: EmailService
  ) {}

  async social(data: SocialSignInInput, lang: AppI18nLang) {
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
      return await this.signinSocial(userSocial, data, lang);
    } else {
      return await this.signupSocial(data, lang);
    }
  }

  async confirmAccount(payload: ConfirmAccountInput, lang: AppI18nLang) {
    const id = payload.user;
    const isValid = await this.userSecretService.validate(payload, lang);

    if (isValid) {
      await this.userRepository.save({
        id,
        confirmed: true,
      });

      return await this.userRepository.findOne({
        where: { id },
      });
    }
  }

  async sendAccountConfirmationEmail(id: number, lang: AppI18nLang) {
    const user = await this.userService.getById(id);

    if (!user.confirmed) {
      const userSecret = await this.userSecretService.create(user);

      await this.emailService.sendAccountConfirmationEmail(
        user.email,
        userSecret,
        lang
      );
    }

    return { success: true } as Success;
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

      user.token = this.authTokenService.generate(id);
      user.avatar = data.avatar;
      user.email = data.email;

      await this.userRepository.save(user);

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
      : await this.userService.create(payload, lang);

    console.log(user, 'created');

    const userSocial = this.userSocialRepository.create({
      user,
      type: data.type,
      secret: data.secret,
    });

    await this.userSocialRepository.save(userSocial);

    user.token = this.authTokenService.generate(user.id);
    await this.userRepository.save(user);

    return user;
  }

  async auth(token: string, lang: AppI18nLang) {
    const err = Error(i18n[lang].err.sessionExpired);

    try {
      const res = this.authTokenService.decode(token);

      const id = res?.id;
      if (!id) throw err;

      const user = await this.userService.getById(id);

      if (!user) throw err;
      if (token != user.token) throw err;

      return user;
    } catch (_) {
      throw err;
    }
  }

  async signup(data: SignUpInput, lang: AppI18nLang) {
    const user = await this.userService.create(data as User, lang);
    user.token = this.authTokenService.generate(user.id);
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

    user.token = this.authTokenService.generate(user.id);
    await this.userRepository.save(user);

    return user;
  }
}
