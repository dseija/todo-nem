import { Router } from 'express';
import {
  createTodo,
  getTodoById,
  getTodos,
  removeTodo,
  updateTodo,
} from '../controllers/todoController';

const todosRoute = () => {
  const router = Router();

  router.post('/', createTodo);

  router.get('/', getTodos);

  router.get('/:todoId', getTodoById);

  router.put('/:todoId', updateTodo);

  router.delete('/:todoId', removeTodo);

  return router;
};

export default todosRoute;
