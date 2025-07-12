import { prisma } from 'libs/prismaClients';
import { PasswordResetToken } from 'modules/user/domain/entitiies/PasswordResetToken';
import { IPasswordResetRepository } from 'modules/user/domain/repositories/IPasswordResetRepository';
import { AppError } from 'utils/error-handling';

export class PasswordResetRepository implements IPasswordResetRepository {
  async createPasswordResetToken(data: {
    token: string;
    userId: number;
  }): Promise<PasswordResetToken> {
    const token = await prisma.passwordResetToken.create({
      data: {
        expiresAt: new Date(Date.now() + 60000), // expires in 1 minute
        token: data.token,
        userId: data.userId,
      },
    });

    if (!token)
      throw AppError.new(
        'internalErrorServer',
        'Failed to create password reset token'
      );

    return new PasswordResetToken(
      token.id,
      token.token,
      token.expiresAt,
      token.userId,
      token.createdAt
    );
  }
  async findTokenByUserId(id: number): Promise<null | PasswordResetToken> {
    const token = await prisma.passwordResetToken.findUnique({
      where: {
        userId: id,
      },
    });

    if (!token) return null;

    return new PasswordResetToken(
      token.id,
      token.token,
      token.expiresAt,
      token.userId,
      token.createdAt
    );
  }
}
