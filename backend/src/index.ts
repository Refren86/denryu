import cors from 'cors';
import crypto from 'crypto';
import express from 'express';
import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';
import mongoose, { ConnectOptions } from 'mongoose';

import apiRoutes from './routes/api.routes';
import errorMiddleware from './middlewares/error.middleware';
import { PORT, MONGODB_URL, CLIENT_URL, API_URL } from './constants/env';

const app = express();

global.crypto = crypto as Crypto; // for unique ids

app.use(express.json()); // built in middleware for json
// middleware to handle urlencoded data:
// form data: 'content-type: application/json'
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: CLIENT_URL
}));
app.use(fileUpload());

app.use(apiRoutes);
app.use(errorMiddleware)

const start = async () => {
  try {
    await mongoose.connect(MONGODB_URL!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
    console.log('Database connected!');
    app.listen(PORT, () => console.log('Started on', API_URL));
  } catch (e) {
    console.log(e);
  }
};

start();
