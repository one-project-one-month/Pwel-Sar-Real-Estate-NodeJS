import { IAuthRepository } from 'modules/user/domain/repositories/IAuthRepository';
import { IPasswordResetRepository } from 'modules/user/domain/repositories/IPasswordResetRepository';
import { AuthRepository } from 'modules/user/infrastructures/repositories/AuthRepository';
import { PasswordResetRepository } from 'modules/user/infrastructures/repositories/PasswordResetRepository';

export class Container {
  static authRepository: IAuthRepository = new AuthRepository();
  static passwordResetRepository: IPasswordResetRepository =
    new PasswordResetRepository();
}
