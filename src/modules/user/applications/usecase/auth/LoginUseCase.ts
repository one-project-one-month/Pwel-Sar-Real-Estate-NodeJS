import bcrypt from 'bcrypt';
import { IAuthRepository } from 'modules/user/domain/repositories/IAuthRepository';
import { generateTokens } from 'utils/auth/auth.service';
import { AppError } from 'utils/error-handling';

export class LoginUseCase {
  // eslint-disable-next-line no-unused-vars
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute({ email, password }: { email: string; password: string }) {
    const user = await this.authRepository.findByEmail(email);

    if (!user) throw AppError.new('badRequest', 'Invalid email or password');

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw AppError.new('badRequest', 'Invalid email or password');

    const { accessToken, refreshToken } = generateTokens(user);

    console.log(accessToken, refreshToken);

    await this.authRepository.createRefreshToken({
      refreshToken,
      userId: user.id,
    });

    return { accessToken, refreshToken };
  }
}
