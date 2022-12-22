import { API_URL } from '../constants/env';
import { emailActions } from '../config/email-action.enum';

const { FORGOT_PASS, WELCOME, EMAIL_ACTIVATION } = emailActions;

const emailTemplates = {
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
    templateName: 'email-activation', // name of pug file
  },
};

export { emailTemplates };
