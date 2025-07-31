import './config/passport.config';
import 'reflect-metadata';

import './config/env/dotenv';
import './config/di.container';

import bodyParser from 'body-parser';
import AppConfig from 'config/env/app-config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import passport from 'passport';
import router from 'routes';

const app = express();
const port = AppConfig.getConfig('PORT');

const whitelist = [
  'http://localhost:5173',
  'http://172.20.10.3:5173',
  process.env.FRONTEND,
];

const corsOptions = {
  origin: function (
    origin: any,
    callback: (err: Error | null, origin?: any) => void
  ) {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(express.json());
app.use(cookieParser());
app.use('/api', router);

app.listen(port, () => console.log(`Server is running on port ${port}`));
