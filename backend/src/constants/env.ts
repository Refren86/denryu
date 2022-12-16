import dotenv from 'dotenv';
dotenv.config();

const API_URL = process.env.API_URL;
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL;
const MONGODB_URL = process.env.MONGODB_URL;
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

// google API/OAuth (Nodemailer)
const OAUTH_MAIL = process.env.OAUTH_MAIL;
const OAUTH_SERVICE = process.env.OAUTH_SERVICE;
const OAUTH_PASSWORD = process.env.OAUTH_PASSWORD;

export {
  PORT,
  API_URL,
  CLIENT_URL,
  MONGODB_URL,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  OAUTH_MAIL,
  OAUTH_SERVICE,
  OAUTH_PASSWORD,
};
