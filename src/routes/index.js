import { Router } from 'express';
import todosRoute from './todosRoute';

const routesHandler = () => {
  const router = Router();

  router.use('/todos', todosRoute());

  return router;
};

export default routesHandler;
