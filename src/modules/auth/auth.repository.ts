import { IAuthRepository } from './interfaces/auth.repo.interface';
import { injectable } from 'tsyringe';
import { prisma } from 'libs/prismaClients';
import { User, Token, Permission } from '../../entities';
import bcrypt from 'bcrypt';
import { UserRegistrationRequestDto } from './dtos/auth.request.dto';
import { AppError, catchErrorAsync, errorKinds } from 'utils/error-handling';

@injectable()
export class AuthRepository implements IAuthRepository {
  // register user
  async registerUserAsync(req: UserRegistrationRequestDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(req.password, 10);
    const newUser = await prisma.user.create({
      data: {
        username: req.username,
        email: req.email,
        password: hashedPassword,
        photo: req.photo,
        roleId: req.roleId,
      },
    });

    return new User({ ...newUser });
  }

  async create(data: any): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
    const newUser = new User({
      id: user.id,
      email: user.email,
      password: user.password,
      username: user.username,
      roleId: user.roleId,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
    return newUser;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) return null;

    return new User({
      id: user.id,
      username: user.username,
      email: user.email,
      password: user.password,
      roleId: user.roleId,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }

  async createRefreshToken(data: {
    refreshToken: string;
    userId: number;
    expiresAt: Date;
  }): Promise<void> {
    // const token = await prisma.token.create({
    // 	data: {
    // 		refreshToken: data.refreshToken,
    // 		userId: data.userId,
    // 		expiresAt: data.expiresAt,
    // 	},
    // });
    // if (!token)
    // 	throw AppError.new(
    // 		"internalErrorServer",
    // 		"Failed to create refresh token"
    // 	);
    // return token;
  }

  async findToken(userId: number): Promise<Token | null> {
    // const token = await prisma.token.findFirst({
    // 	where: { userId: userId },
    // });

    // if (!token) return null;

    // const refreshToken = new Token(
    // 	token.id,
    // 	token.refreshToken,
    // 	token.userId,
    // 	token.expiresAt,
    // 	token.createdAt,
    // 	token.updatedAt
    // )

    return null;
  }

  async deleteToken(refreshToken: string): Promise<void> {
    // const token = await prisma.token.deleteMany({
    // 	where: { userId: userId },
    // });
    // if (!token)
    // 	throw AppError.new("internalErrorServer", "Failed to delete token");
  }

  async getAllPermissionsAsync(): Promise<Permission[]> {
    const [errors, rawPermission] = await catchErrorAsync(
      prisma.permission.findMany()
    );
    if (errors || !rawPermission)
      throw AppError.new(
        errorKinds.internalServerError,
        'prisma error: while getting all permissions'
      );
    return rawPermission.map(
      (permission: any) =>
        new Permission({
          id: permission.id,
          action: permission.action,
          resource: permission.resource,
        })
    );
  }

  async getPermissionByRoleId(roleID: number): Promise<Permission[]> {
    const [errors, rawPermission] = await catchErrorAsync(
      prisma.permission.findMany({
        where: {
          roleId: roleID,
        },
      })
    );
    if (errors || !rawPermission)
      throw AppError.new(
        errorKinds.internalServerError,
        'prisma error: while getting all permissions'
      );
    return rawPermission.map(
      (permission) =>
        new Permission({
          id: permission.id,
          action: permission.action,
          resource: permission.resource,
        })
    );
  }
}
