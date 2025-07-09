import './config/env/dotenv';
import './config/passport.config';
import 'reflect-metadata';
import './config/env/dotenv';
import './config/di.container';

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from 'routes';
import AppConfig from 'config/env/app-config';
import passport from 'passport';
import bodyParser from 'body-parser';

const app = express();
const port = AppConfig.getConfig('PORT');

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use('/api', router);

app.listen(port, () => console.log(`Server is running on port ${port}`));
