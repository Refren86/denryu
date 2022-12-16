import path from 'path';
import nodemailer from 'nodemailer';
import EmailTemplates from 'email-templates';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
// @ts-ignore
import emailTemplates from '../email-templates';
import { ITemplateInfo } from '../interfaces/email.interface';

import { OAUTH_SERVICE, OAUTH_MAIL, OAUTH_PASSWORD } from '../constants/env';
import ApiError from '../exceptions/api.error';

class EmailService {
  private transporter: nodemailer.Transporter;
  private templateRenderer;
  private templateInfo: ITemplateInfo;
  private html: string;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: OAUTH_SERVICE,
      auth: {
        user: OAUTH_MAIL,
        pass: OAUTH_PASSWORD,
      },
    } as SMTPTransport.Options);

    this.templateRenderer = new EmailTemplates({
      views: {
        root: path.join(process.cwd(), 'src', 'email-templates'),
      },
    });
  }

  async sendActivationMail(to: string, link: string, emailAction: any) {
    this.templateInfo = emailTemplates[emailAction];

    if (!this.templateInfo) {
      throw ApiError.WrongTemplate();
    }

    this.html = await this.templateRenderer.render(
      this.templateInfo.templateName
    ); // renders pug file

    await this.transporter.sendMail({
      from: OAUTH_MAIL,
      to, // 'email1@gmail.com, email2@gmail.com, email3@gmail.com'
      subject: this.templateInfo.subject,
      html: this.html,
    });
  }
}

const emailService = new EmailService();

export { emailService };
