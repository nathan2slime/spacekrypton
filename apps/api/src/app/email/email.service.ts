import { Transporter, createTransport } from 'nodemailer';
import { Injectable } from '@nestjs/common';
import { AppI18nLang, i18n } from '@kry/i18n';

import { UserSecret } from '../models/user_secret.model';

import templates from './templates';

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
    { secret, user: { username } }: UserSecret,
    lang: AppI18nLang
  ) {
    const { base, active } = templates;
    const { texts, subject } = i18n[lang].email.active;
    const { sendMail } = this.transporter;

    this.transporter.sendMail({
      to: email,
      subject,
      html: base(
        active({
          secret,
          texts,
          username,
        })
      ),
    });
  }
}
