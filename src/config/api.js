import { config as dotenvConfig } from 'dotenv';
dotenvConfig();

export const apiConfig = {
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiration: '2w',
};
