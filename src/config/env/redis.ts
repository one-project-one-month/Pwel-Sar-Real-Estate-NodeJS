import dotenv from 'dotenv';

dotenv.config();

interface Config {
  cloudApiKey: string;
  cloudApiSecret: string;
  cloudName: string;
  password: string;
  redisHost: string;
  redisPort: number;
}

const config: Config = {
  cloudApiKey: process.env.CLOUDINARY_API_KEY!,
  cloudApiSecret: process.env.CLOUDINARY_API_SECRET!,
  cloudName: process.env.CLOUDINARY_CLOUD_NAME!,
  password: process.env.PASSWORD!,
  redisHost: process.env.REDIS_HOST!,
  redisPort: Number(process.env.REDIS_PORT!),
};

export default config;
