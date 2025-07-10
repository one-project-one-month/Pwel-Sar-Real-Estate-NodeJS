import { IAuthRepository } from 'modules/user/domain/repositories/IAuthRepository';
import { AuthRepository } from 'modules/user/infrastructures/repositories/AuthRepository';

export class Container {
  static authRepository: IAuthRepository = new AuthRepository();
}
