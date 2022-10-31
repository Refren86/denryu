import nodemailer from 'nodemailer';
import { google } from 'googleapis';

import {
  API_URL,
  OAUTH_CLIENT_ID,
  OAUTH_CLIENT_SECRET,
  OAUTH_REDIRECT_URL,
  OAUTH_REFRESH_TOKEN,
  OAUTH_SERVICE,
  OAUTH_MAIL,
} from '../constants/env';

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  OAUTH_CLIENT_ID, // Client Id
  OAUTH_CLIENT_SECRET, // Client Secret
  OAUTH_REDIRECT_URL // Redirect URL
);

oauth2Client.setCredentials({
  refresh_token: OAUTH_REFRESH_TOKEN,
});

const accessToken = oauth2Client.getAccessToken().then(res => res.token);

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: OAUTH_SERVICE,
      auth: {
        type: 'OAuth2',
        user: OAUTH_MAIL,
        clientId: OAUTH_CLIENT_ID,
        clientSecret: OAUTH_CLIENT_SECRET,
        refreshToken: OAUTH_REFRESH_TOKEN,
        accessToken: String(accessToken),
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  async sendActivationMail(to: string, link: string) {
    await this.transporter.sendMail({
      from: OAUTH_MAIL,
      to, // 'email1@gmail.com, email2@gmail.com, email3@gmail.com'
      subject: `Account activation on ${API_URL}`,
      html: `
      <div>
          <h1>For activation, follow the link:</h1>
          <a href="${link}">${link}</a>
      </div>`,
    });
  }
}

const emailService = new EmailService();

export { emailService };
