import { Router } from 'express';

const userRoute = () => {
  const router = Router();

  router.get('/whoami', (req, res) => {
    res.json(req.user);
  });

  return router;
};

export default userRoute;
