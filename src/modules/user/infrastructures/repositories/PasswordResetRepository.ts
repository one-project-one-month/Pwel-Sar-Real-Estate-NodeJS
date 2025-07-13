import bcrypt from 'bcrypt';
import { prisma } from 'libs/prismaClients';
import { PasswordResetToken } from 'modules/user/domain/entitiies/PasswordResetToken';
import { User } from 'modules/user/domain/entitiies/User.entity';
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
  async deleteTokenByUserId(id: number): Promise<void> {
    await prisma.passwordResetToken.delete({
      where: { userId: id },
    });
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
  async passwordReset(data: {
    newPassword: string;
    userId: number;
  }): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.newPassword, 10);

    const updatedUser = await prisma.user.update({
      data: { password: hashedPassword },
      where: { id: data.userId },
    });

    if (!updatedUser)
      throw AppError.new(
        'internalErrorServer',
        'Failed to reset user password'
      );

    return new User(updatedUser);
  }
}
