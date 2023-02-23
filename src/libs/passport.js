import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { getUserByUsername } from '../controllers/userController';

const setupPassport = () => {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      const [err, user] = await getUserByUsername(username);
      if (!user) return done(null, false);

      try {
        const validPassword = await user.comparePasswords(password);
        if (!validPassword) return done(null, false);

        return done(null, user.safeProps());
      } catch (err) {
        done(err);
      }
    })
  );

  return passport;
};

export default setupPassport;
