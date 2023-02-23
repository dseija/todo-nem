import { Router } from 'express';
import passport from 'passport';
import { createUser, getSignedToken } from '../controllers/userController';

const authRoute = ({ apiConfig }) => {
  const router = Router();

  router.post('/register', async (req, res, next) => {
    const [err, user] = await createUser(req.body);
    if (err) return next(err);

    res.status(201).json(user);
  });

  router.post(
    '/login',
    passport.authenticate('local', { session: false }),
    async (req, res) => {
      res.json({
        ...req.user,
        token: getSignedToken(req.user, apiConfig),
      });
    }
  );

  return router;
};

export default authRoute;
