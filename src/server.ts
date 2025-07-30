import './config/env/dotenv';
import 'module-alias/register';

import './config/passport.config';
import 'reflect-metadata';

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

app.use((req, res, next) => {
  console.log('--- Incoming Request Info ---');
  console.log('Host:', req.headers.host);
  console.log('X-Real-IP:', req.headers['x-real-ip']);
  console.log('X-Forwarded-For:', req.headers['x-forwarded-for']);
  console.log('Remote Address:', req.connection.remoteAddress);
  console.log('Handled by:', process.env.HOSTNAME ?? 'unknown'); // useful in container
  next();
});

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use('/api', router);

app.listen(port, () => console.log(`Server is running on port ${port}`));
