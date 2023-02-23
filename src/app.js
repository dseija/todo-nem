import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import routesHandler from './routes';
import { dbConfig } from './configs';
import setupPassport from './libs/passport';

const app = express();

// MongoDB Connection
mongoose.set('strictQuery', true);
mongoose.Promise = global.Promise;
mongoose
  .connect(dbConfig.connectionUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connection success!'))
  .catch((err) => console.error(err));

// bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Passport setup
const passport = setupPassport();
app.use(passport.initialize());

// add routes
app.use('/', cors(), routesHandler());

// error handling
app.use((err, req, res, next) => {
  console.log({ err });
  const statusCodes = {
    ValidationError: 400,
    NotFound: 404,
  };
  const status = statusCodes[err.name] || 500;
  res.status(err.status || status).json(err);
});

export default app;
