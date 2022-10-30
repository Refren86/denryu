import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 5000;
const API_URL = process.env.API_URL;
const MONGODB_URL = process.env.MONGODB_URL;
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
// nodemailer (info from gmail setting)
const SMTP_HOST = process.env.SMTP_HOST; 
const SMTP_PORT = process.env.SMTP_PORT || 0; 
const SMTP_USER = process.env.SMTP_USER; 
const SMTP_PASSWORD = process.env.SMTP_PASSWORD; 

export {
  PORT,
  API_URL,
  MONGODB_URL,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASSWORD,
};
