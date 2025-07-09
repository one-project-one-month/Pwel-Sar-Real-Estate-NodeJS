import bcrypt from 'bcrypt';
import { prisma } from 'libs/prismaClients';
import { Token } from 'modules/user/domain/entitiies/Token.entity';
import { User } from 'modules/user/domain/entitiies/User.entity';
import { IAuthRepository } from 'modules/user/domain/repositories/IAuthRepository';
import { AppError } from 'utils/error-handling';

export class AuthRepository implements IAuthRepository {
  async create(data: any): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
    const newUser = new User({
      createdAt: user.createdAt,
      email: user.email,
      id: user.id,
      password: user.password,
      roleId: user.roleId,
      updatedAt: user.updatedAt,
      username: user.username,
    });
    return newUser;
  }

  async createRefreshToken(data: {
    refreshToken: string;
    userId: number;
  }): Promise<Token> {
    const token = await prisma.refreshToken.create({
      data: {
        token: data.refreshToken,
        userId: data.userId,
      },
    });

    if (!token)
      throw AppError.new(
        'internalErrorServer',
        'Failed to create refresh token'
      );

    return new Token(token.id, token.token, token.userId);
  }

  async deleteToken(userId: number): Promise<void> {
    const token = await prisma.refreshToken.deleteMany({
      where: { userId },
    });

    if (!token)
      throw AppError.new('internalErrorServer', 'Failed to delete token');
  }

  async findByEmail(email: string): Promise<null | User> {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) return null;

    return new User({
      createdAt: user.createdAt,
      email: user.email,
      id: user.id,
      password: user.password,
      roleId: user.roleId,
      updatedAt: user.updatedAt,
      username: user.username,
    });
  }

  async findById(id: number): Promise<null | User> {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) return null;

    return new User({
      createdAt: user.createdAt,
      email: user.email,
      id: user.id,
      password: user.password,
      roleId: user.roleId,
      updatedAt: user.updatedAt,
      username: user.username,
    });
  }

  async findToken(userId: number): Promise<null | Token> {
    const token = await prisma.refreshToken.findFirst({
      where: { userId: userId },
    });

    if (!token) return null;

    const refreshToken = new Token(token.id, token.token, token.userId);

    return refreshToken;
  }
}
