import { PasswordResetTokenDTO } from 'modules/user/applications/dtos/PasswordResetTokenDTO';
import { IAuthRepository } from 'modules/user/domain/repositories/IAuthRepository';
import { IPasswordResetRepository } from 'modules/user/domain/repositories/IPasswordResetRepository';
import { generateOTP } from 'utils/auth/otp';
import { AppError, catchErrorAsync } from 'utils/error-handling';

/* eslint-disable no-unused-vars */
export class RequestPasswordResetTokenUseCase {
  constructor(
    private readonly authRepository: IAuthRepository,
    private readonly passwordResetRepository: IPasswordResetRepository
  ) {}

  async execute(email: string): Promise<PasswordResetTokenDTO> {
    const user = await this.authRepository.findByEmail(email);

    if (!user) throw AppError.new('badRequest', 'Invalid email');

    const alreadyRequested =
      await this.passwordResetRepository.findTokenByUserId(user.id);

    if (alreadyRequested && !alreadyRequested.isExpired())
      throw AppError.new('badRequest', 'Already requested a password reset');

    const otp = generateOTP();
    const [error, token] = await catchErrorAsync(
      this.passwordResetRepository.createPasswordResetToken({
        token: otp,
        userId: user.id,
      })
    );
    if (error) throw error;
    return new PasswordResetTokenDTO(token);
  }
}
