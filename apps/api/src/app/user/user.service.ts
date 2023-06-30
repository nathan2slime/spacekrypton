import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppI18nLang, i18n } from '@kry/i18n';
import { Repository } from 'typeorm';

import { User } from '../models/user.model';

import EmailService from '../email/email.service';
import UserSecretService from '../user_secret/user_secret.service';

@Injectable()
export default class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly emailService: EmailService,
    private readonly userSecretService: UserSecretService
  ) {}

  async create(data: User, lang: AppI18nLang): Promise<User> {
    const isRegistred = await this.userRepository.exist({
      where: {
        email: data.email,
      },
    });
    if (isRegistred) throw new Error(i18n[lang].err.emailAlredyExists);

    const user = this.userRepository.create({
      ...data,
    });
    const { id } = await this.userRepository.save(user);

    const userSecret = await this.userSecretService.create(user);
    await this.emailService.sendAccountConfirmationEmail(
      data.email,
      userSecret,
      lang
    );

    return await this.userRepository.findOne({
      where: { id },
      relations: {
        roles: true,
        social: true,
      },
    });
  }

  async getById(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: {
        roles: true,
        social: true,
      },
    });

    return user;
  }
}
