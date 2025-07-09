import dotenv from "dotenv";

dotenv.config();

interface Config {
  redisHost: string;
  redisPort: number;
  password: string;
}

const config: Config = {
  redisHost: process.env.REDIS_HOST || "localhost",
  redisPort: Number(process.env.REDIS_PORT) || 6379,
  password: process.env.PASSWORD || "123456",
};  

export default config;
