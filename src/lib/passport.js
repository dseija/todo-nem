import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTStratehy, ExtractJwt } from 'passport-jwt';
import { getUserById, getUserByUsername } from '../controllers/userController';

const setupPassport = ({ apiConfig }) => {
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

  passport.use(
    new JWTStratehy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: apiConfig.jwtSecret,
      },
      async (jwtPayload, done) => {
        try {
          const [err, user] = await getUserById(jwtPayload.userId);
          if (!user) return done(null, false);
          if (jwtPayload.username !== user.username) return done(null, false);

          return done(null, user.safeProps());
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  return passport;
};

export default setupPassport;
