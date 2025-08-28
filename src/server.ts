import './config/passport.config';
import 'reflect-metadata';

import './config/env/dotenv';
// import './config/di.container';

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
    'http://localhost:5174',
    process.env.FRONTEND,
];

const corsOptions = {
    credentials: true,
    origin: function (
        origin: any,
        // eslint-disable-next-line no-unused-vars
        callback: (err: Error | null, origin?: any) => void
    ) {
        if (!origin || whitelist.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(express.json());
app.use(cookieParser());
app.use('/api', router);

app.listen(port, () => console.log(`Server is running on port ${port}`));
