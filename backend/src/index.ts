import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import mongoose, { ConnectOptions } from 'mongoose';

import apiRoutes from './routes/api.routes';
import { PORT, MONGODB_URL } from './constants/env';
import errorMiddleware from './middlewares/error.middleware';

const app = express();

app.use(express.json()); // built in middleware for json
// middleware to handle urlencoded data:
// form data: 'content-type: application/json'
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use(apiRoutes);
app.use(errorMiddleware)

const start = async () => {
  try {
    await mongoose.connect(MONGODB_URL!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
    console.log('Database connected!');

    app.listen(PORT, () => console.log('Started on port ' + PORT));
  } catch (e) {
    console.log(e);
  }
};

start();
