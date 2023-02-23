import { config as dotenvConfig } from 'dotenv';
dotenvConfig();

export const dbConfig = {
  connectionUrl: process.env.DB_CONNECTION_URL,
};
