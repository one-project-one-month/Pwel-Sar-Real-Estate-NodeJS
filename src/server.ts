import './config/env/dotenv';
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "routes";
import AppConfig from "config/env/app-config";

const app = express();
const port = AppConfig.getConfig("PORT");
app.use(express.json());

app.use(cors());
app.use(cookieParser());
app.use('/api', router);

app.listen(port, () => console.log(`Server is running on port ${port}`));
