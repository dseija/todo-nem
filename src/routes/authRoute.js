import { Router } from 'express';
import passport from 'passport';
import { createUser } from '../controllers/userController';

const authRoute = () => {
  const router = Router();

  router.post('/register', async (req, res, next) => {
    const [err, user] = await createUser(req.body);
    if (err) return next(err);

    res.status(201).json(user);
  });

  router.post(
    '/login',
    passport.authenticate('local', { session: false }),
    async (req, res, next) => {
      res.json(req.user);
    }
  );

  return router;
};

export default authRoute;
