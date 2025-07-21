import { IAuthRepository } from 'modules/user/domain/repositories/IAuthRepository';

export class LogoutUseCase {
  // eslint-disable-next-line no-unused-vars
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(userId: number): Promise<void> {
    await this.authRepository.deleteToken(userId);
  }
}
