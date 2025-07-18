import './config/env/dotenv';
import './config/passport.config';
import 'reflect-metadata';

import './config/env/dotenv';
import './config/di.container';

import bodyParser from 'body-parser';
import AppConfig from 'config/env/app-config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { ErrorRequestHandler } from 'express';
import multer from 'multer';
import passport from 'passport';
import router from 'routes';

(BigInt.prototype as any).toJSON = function () {
  return Number(this);
};

const app = express();
const port = AppConfig.getConfig('PORT');

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use('/api', router);

// Global error handler for Multer and other errors
// eslint-disable-next-line no-unused-vars
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    res.status(400).json({ message: err.message });
    return;
  }
  res.status(500).json({ message: err.message ?? 'Internal Server Error' });
  return;
};
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));
