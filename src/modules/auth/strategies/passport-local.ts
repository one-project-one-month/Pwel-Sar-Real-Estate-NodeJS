import { Strategy as LocalStrategy } from 'passport-local';
import passport from 'passport';
import bcrypt from 'bcrypt';
import { inject, injectable } from 'tsyringe';
import { IAuthRepository } from '../interfaces/auth.repo.interface';
import { AppError, errorKinds } from '../../../utils/error-handling';

@injectable()
export class PassportConfig {
  constructor(@inject('IAuthRepository') private authRepo: IAuthRepository) {}

  setup() {
    passport.use(
      new LocalStrategy(
        { usernameField: 'email', passwordField: 'password' },
        async (email: string, password: string, done: any) => {
          try {
            const user = await this.authRepo.findByEmail(email);
            if (!user)
              throw AppError.new(
                errorKinds.invalidCredential,
                'User not found.'
              );

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch)
              throw AppError.new(
                errorKinds.invalidCredential,
                'Incorrect password.'
              );

            done(null, user);
          } catch (err) {
            done(err);
          }
        }
      )
    );
  }
}
