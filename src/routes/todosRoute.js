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

  router.post('/', async (req, res, next) => {
    const [err, todo] = await createTodo(req.user.id, req.body.description);
    if (err) return next(err);

    res.status(201).json(todo);
  });

  router.get('/', async (req, res, next) => {
    const [err, todos] = await getTodos(req.user.id);
    if (err) return next(err);

    res.json(todos);
  });

  router.get('/:todoId', async (req, res, next) => {
    const [err, todo] = await getTodoById(req.user.id, req.params.todoId);
    if (err) return next(err);

    res.json(todo);
  });

  router.put('/:todoId', async (req, res, next) => {
    const [err, todo] = await updateTodo(
      req.user.id,
      req.params.todoId,
      req.body
    );
    if (err) return next(err);

    res.json(todo);
  });

  router.delete('/:todoId', async (req, res, next) => {
    const [err] = await removeTodo(req.user.id, req.params.todoId);
    if (err) return next(err);

    res.json({ message: 'Successfully deleted.' });
  });

  return router;
};

export default todosRoute;
