import { config as dotenvConfig } from 'dotenv';
dotenvConfig();

import app from './src/app';

const PORT = process.env.PORT || 3400;

app.listen(PORT, () => console.log(`Your server is running on port ${PORT}`));
