import path from 'path';
import nodemailer from 'nodemailer';
import EmailTemplates from 'email-templates';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

import ApiError from '../exceptions/api.error';
import { emailTemplates } from '../email-templates';
import { ITemplateInfo } from '../interfaces/email.interface';
import { OAUTH_SERVICE, OAUTH_MAIL, OAUTH_PASSWORD } from '../constants/env';

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

  // locals - object with variables for pug
  async sendEmail(
    to: string,
    locals: Record<string, string> = {},
    emailAction: string
  ) {
    this.templateInfo = emailTemplates[emailAction]; // emailAction: WELCOME / FORGOT_PASS / EMAIL_ACTIVATION...

    if (!this.templateInfo) {
      throw ApiError.WrongTemplate();
    }

    // renders pug file (1st - pug file name, 2nd - variable for pug)
    this.html = await this.templateRenderer.render(
      this.templateInfo.templateName,
      locals
    );

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
