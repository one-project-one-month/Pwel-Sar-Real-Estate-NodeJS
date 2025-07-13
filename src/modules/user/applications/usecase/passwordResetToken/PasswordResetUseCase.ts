import { IAuthRepository } from 'modules/user/domain/repositories/IAuthRepository';
import { IPasswordResetRepository } from 'modules/user/domain/repositories/IPasswordResetRepository';
import { AppError, catchErrorAsync } from 'utils/error-handling';

import { UserDTO } from '../../dtos/UserDTO';

/* eslint-disable no-unused-vars */
export class PasswordResetUseCase {
  constructor(
    private readonly authRepository: IAuthRepository,
    private readonly passwordResetRepository: IPasswordResetRepository
  ) {}

  async execute(
    email: string,
    newPassword: string,
    token: string
  ): Promise<UserDTO> {
    const user = await this.authRepository.findByEmail(email);

    if (!user) throw AppError.new('badRequest', 'Invalid email');

    const requestedToken = await this.passwordResetRepository.findTokenByUserId(
      user.id
    );

    if (!requestedToken || requestedToken.isExpired())
      throw AppError.new(
        'badRequest',
        'Cannot reset password or token expired'
      );

    if (requestedToken.token !== token)
      throw AppError.new('badRequest', 'Invalid token');

    const [error, result] = await catchErrorAsync(
      this.passwordResetRepository.passwordReset({
        newPassword: newPassword,
        userId: user.id,
      })
    );

    if (error) throw error;

    this.passwordResetRepository.deleteTokenByUserId(user.id);

    return new UserDTO(result);
  }
}
