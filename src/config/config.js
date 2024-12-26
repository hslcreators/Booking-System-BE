import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const requiredEnvVars = ['PORT'];

requiredEnvVars.forEach((key) => {
    if (!process.env[key]) {
        console.error(`Error: Missing required environment variable ${key}`);
        process.exit(1);
    }
});

export const config = {
    MONGO_URL: process.env.MONGO_URL,
    PORT: process.env.PORT,
};