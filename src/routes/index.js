import { Router } from 'express';
import passport from 'passport';
import authRoute from './authRoute';
import todosRoute from './todosRoute';
import userRoute from './userRoute';

const routesHandler = (config) => {
  const router = Router();

  router.use('/auth', authRoute(config));
  router.use(
    '/todos',
    passport.authenticate('jwt', { session: false }),
    todosRoute()
  );
  router.use(
    '/user',
    passport.authenticate('jwt', { session: false }),
    userRoute(config)
  );

  return router;
};

export default routesHandler;
