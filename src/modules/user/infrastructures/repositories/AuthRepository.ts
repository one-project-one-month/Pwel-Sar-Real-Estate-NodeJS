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
  }): Promise<void> {
    // First check if a token already exists for this user
    const existingToken = await prisma.refreshToken.findFirst({
      where: { userId: data.userId },
    });

    let token;

    if (existingToken) {
      // If a token already exists, update it
      token = await prisma.refreshToken.update({
        data: { token: data.refreshToken, updatedAt: new Date() },
        where: { id: existingToken.id },
      });
    } else {
      // If a token doesn't exist, create a new one
      token = await prisma.refreshToken.create({
        data: {
          token: data.refreshToken,
          updatedAt: new Date(),
          userId: data.userId,
        },
      });
    }

    if (!token)
      throw AppError.new(
        'internalErrorServer',
        'Failed to create refresh token'
      );

    // return new Token(token.id, token.token, token.userId);
  }

  //   async createRefreshToken(data: {
  //     refreshToken: string;
  //     userId: number;
  //   }): Promise<Token> {
  //     const token = await prisma.refreshToken.create({
  //       data: {
  //         token: data.refreshToken,
  //         userId: data.userId,
  //       },
  //     });

  //     if (!token)
  //       throw AppError.new(
  //         'internalErrorServer',
  //         'Failed to create refresh token'
  //       );

  //     return new Token(token.id, token.token, token.userId);
  //   }

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

  async findToken(refreshToken: string): Promise<null | Token> {
    const token = await prisma.refreshToken.findFirst({
      where: { token: refreshToken },
    });

    if (!token) return null;

    return new Token(token.id, token.token, token.userId);
  }
}
