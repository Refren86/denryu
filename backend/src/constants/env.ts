import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 5000;
const API_URL = process.env.API_URL;
const CLIENT_URL = process.env.CLIENT_URL;
const MONGODB_URL = process.env.MONGODB_URL;
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

// google API/OAuth (Nodemailer)
const OAUTH_MAIL = process.env.OAUTH_MAIL;
const OAUTH_SERVICE = process.env.OAUTH_SERVICE;
const OAUTH_CLIENT_ID = process.env.OAUTH_CLIENT_ID; 
const OAUTH_CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET; 
const OAUTH_REDIRECT_URL = process.env.OAUTH_REDIRECT_URL; 
const OAUTH_REFRESH_TOKEN = process.env.OAUTH_REFRESH_TOKEN; 

export {
  PORT,
  API_URL,
  CLIENT_URL,
  MONGODB_URL,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  OAUTH_MAIL,
  OAUTH_SERVICE,
  OAUTH_CLIENT_ID,
  OAUTH_CLIENT_SECRET,
  OAUTH_REDIRECT_URL,
  OAUTH_REFRESH_TOKEN,
};
