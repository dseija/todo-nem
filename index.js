import { serverConfig } from './src/config';
import app from './src/app';

app.listen(serverConfig.port, () =>
  console.log(`Your server is running on port ${serverConfig.port}`)
);
