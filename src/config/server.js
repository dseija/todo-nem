import { config as dotenvConfig } from 'dotenv';
dotenvConfig();

export const serverConfig = {
  port: process.env.PORT || 3400,
};
