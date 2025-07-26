import { AuthRepository } from 'modules/user/infrastructures/repositories/AuthRepository';
import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { ACCESS_TOKEN_PUBLIC_KEY } from 'utils/auth/jwt';

import { AuthUserDTO } from '../dtos/AuthUserDTO';

const authRepository = new AuthRepository();

export default passport.use(
  'access-jwt',
  new JwtStrategy(
    {
      algorithms: ['RS256'],
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: ACCESS_TOKEN_PUBLIC_KEY,
    },
    async (jwt_payload, done) => {
      try {
        const user = await authRepository.findById(jwt_payload.id);

        if (!user) {
          return done(null, false, { message: 'User not found' });
        }

        const authUser = new AuthUserDTO(user);

        if (user) return done(null, authUser);
        else return done(null, false);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);
