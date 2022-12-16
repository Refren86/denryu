// @ts-ignore
import { emailActions } from '../config/email-action.enum';
import { API_URL } from '../constants/env';

const { FORGOT_PASS, WELCOME, EMAIL_ACTIVATION } = emailActions;

const emailsContent = {
  [WELCOME]: {
    subject: 'Welcome on board!',
    templateName: 'welcome', // name of pug file
  },
  [FORGOT_PASS]: {
    subject: 'Welcome on board!',
    templateName: 'forgot-pass', // name of pug file
  },
  [EMAIL_ACTIVATION]: {
    subject: `Account activation on ${API_URL}`,
    templateName: ''
  },
};

export { emailsContent };
