import passport from 'passport';
import 'modules/auth/strategies/passport-local';

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, 'user');
});
