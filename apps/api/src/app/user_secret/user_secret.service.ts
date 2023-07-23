import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { addMinutes, isBefore } from 'date-fns';
import { Repository } from 'typeorm';
import { AppI18nLang, i18n } from '@kry/i18n';

import { UserSecret } from '../models/user_secret.model';
import { ValidateUserSecret } from './user_secret.types';
import { User } from '../models/user.model';

@Injectable()
export default class UserSecretService {
  constructor(
    @InjectRepository(UserSecret)
    private readonly userSecretRepository: Repository<UserSecret>
  ) {}

  async create(user: User) {
    await this.userSecretRepository.clear();
    const userSecret = this.userSecretRepository.create({
      user,
      secret: Math.floor(100000 + Math.random() * 900000).toString(),
      expiresIn: addMinutes(new Date(), 30),
    });

    await this.userSecretRepository.save(userSecret);

    return userSecret;
  }

  async expired(user: User) {
    const secret = await this.userSecretRepository.findOne({
      where: { user: { id: user.id } },
    });

    if (!secret) return true;

    const isValid = isBefore(new Date(), secret.expiresIn);

    return !isValid;
  }

  async validate(data: ValidateUserSecret, lang: AppI18nLang) {
    const secrets = await this.userSecretRepository.find({
      where: { user: { id: data.user } },
    });

    const secret = secrets.find(el => el.secret == data.secret);
    if (!secret) throw new Error(i18n[lang].err.invalidSecret);

    const isValid = isBefore(new Date(), secret.expiresIn);
    if (!isValid) throw new Error(i18n[lang].err.secretExpired);

    await this.userSecretRepository.clear();

    return true;
  }
}
