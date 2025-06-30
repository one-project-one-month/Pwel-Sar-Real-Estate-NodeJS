import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const port = process.env.PORT;

app.use(cors());
app.use(cookieParser());

app.get("/", (req, res) => {
	res.send("Real Estate API is running!");
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
