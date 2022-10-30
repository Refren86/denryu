import nodemailer from 'nodemailer';

import {
  API_URL,
  SMTP_HOST,
  SMTP_PASSWORD,
  SMTP_PORT,
  SMTP_USER,
} from '../constants/env';

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: true, // read more
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD,
      },
    });
  }

  async sendActivationMail(to: string, link: string) {
    await this.transporter.sendMail({
      from: SMTP_USER,
      to,
      subject: `Account activation on ${API_URL}`,
      text: '',
      html: `<div>
          <h1>For activation, follow the link:</h1>
          <a href="${link}">${link}</a>
        </div>`,
    });
  }
}

const emailService = new EmailService();

export { emailService };
