import { IAuthRepository } from 'modules/user/domain/repositories/IAuthRepository';
import { generateAccessToken } from 'utils/auth/auth.service';
import { verifyRefreshToken } from 'utils/auth/jwt';
import { AppError, errorKinds } from 'utils/error-handling';

export class RefreshAccessTokenUseCase {
  // eslint-disable-next-line no-unused-vars
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(refreshToken: string) {
    const token = await this.authRepository.findToken(refreshToken);

    if (!token) throw AppError.new(errorKinds.notFound, 'Token not found');

    const decoded = verifyRefreshToken(refreshToken);

    if (!decoded)
      throw AppError.new(errorKinds.notAuthorized, 'Token is wrong');

    const accessToken = generateAccessToken(decoded);

    return { accessToken };
  }
}
