import { Router } from 'express';
import authRoute from './authRoute';
import todosRoute from './todosRoute';

const routesHandler = () => {
  const router = Router();

  router.use('/todos', todosRoute());
  router.use('/auth', authRoute());

  return router;
};

export default routesHandler;
