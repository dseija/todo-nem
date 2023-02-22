import express from 'express';
import routesHandler from './routes';

const app = express();

app.use('/', routesHandler());

export default app;
