import { serverConfig } from './config';
import app from './app';

app.listen(serverConfig.port, () =>
  console.log(`Your server is running on port ${serverConfig.port}`)
);
