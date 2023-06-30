import { Transporter, createTransport } from 'nodemailer';
import { Injectable } from '@nestjs/common';
import { AppI18nLang } from '@kry/i18n';

import { UserSecret } from '../models/user_secret.model';

@Injectable()
export default class EmailService {
  transporter: Transporter;

  constructor() {
    this.transporter = createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_SECRET,
      },
    });
  }

  async sendAccountConfirmationEmail(
    email: string,
    userSecret: UserSecret,
    _lang: AppI18nLang
  ) {
    this.transporter.sendMail({
      from: '',
      to: email,
      subject: 'Código de confirmação: ' + userSecret.user.username,
      html: `Olá ${userSecret.user.username} seu código aqui: ${userSecret.secret}`,
    });
  }
}
