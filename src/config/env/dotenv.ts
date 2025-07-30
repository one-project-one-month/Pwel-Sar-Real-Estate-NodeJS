import fs from 'fs';
import dotenv from 'dotenv';

const envPath = process.env.ENV_FILE || '.env';

// Only load if the file actually exists
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
} else {
  console.warn(`⚠️  Env file not found at: ${envPath}`);
}
