import { User } from 'entities';
import { AppError, catchErrorAsync } from 'utils/error-handling';

import { IUserRepository } from 'modules/user/interfaces/user.repo.interface';
import { GetAllUserRequestDto } from 'modules/user/dtos/user.request.dto';
import { GetAllUserResponseDto } from 'modules/user/dtos/user.response.dto';
import { prisma } from 'libs/prismaClients';
import { injectable } from 'tsyringe';

@injectable()
export class UserRepository implements IUserRepository {
  async createUserAsync(data: any): Promise<User> {
    //:TODO change any
    const user = await prisma.user.create({ data });
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

  async findUserById(id: number): Promise<User> {
    try {
      const user = await prisma.user.findUnique({ where: { id } });
      if (!user) {
        throw AppError.new('badRequest', 'user not found');
      }
      return new User({
        createdAt: user.createdAt,
        email: user.email,
        id: user.id,
        password: user.password,
        roleId: user.roleId,
        updatedAt: user.updatedAt,
        username: user.username,
      });
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      throw AppError.new(
        'internalErrorServer',
        'prisma error: while getting user by id'
      );
    }
  }

  async getAllUsersAsync(
    parmas: GetAllUserRequestDto
  ): Promise<GetAllUserResponseDto> {
    const { limit = 20, page = 0 } = parmas;
    const [errors, result] = await catchErrorAsync(
      prisma.$transaction([
        prisma.user.findMany({
          orderBy: { createdAt: 'desc' },
          skip: page * limit,
          take: limit,
          where: this.getListFilter(parmas),
        }),
        prisma.user.count({
          where: this.getListFilter(parmas),
        }),
      ])
    );

    console.log(errors);

    if (errors || !result)
      throw AppError.new(
        'internalErrorServer',
        'prisma error: while getting all users'
      );
    const [rawUsers, usersCount] = result;
    const users = rawUsers.map(
      (user) =>
        new User({
          createdAt: user.createdAt,
          email: user.email,
          id: user.id,
          password: user.password,
          roleId: user.roleId,
          updatedAt: user.updatedAt,
          username: user.username,
        })
    );
    return {
      totalCount: usersCount,
      users,
    };
  }

  async updateUserAsync(data: any): Promise<User> {
    //:TODO change any
    const user = await prisma.user.update({ data, where: { id: data.id } });
    const updatedUser = new User({
      createdAt: user.createdAt,
      email: user.email,
      id: user.id,
      password: user.password,
      roleId: user.roleId,
      updatedAt: user.updatedAt,
      username: user.username,
    });
    return updatedUser;
  }

  private getListFilter = (params: GetAllUserRequestDto) => {
    const { searchBy, searchKeyword } = params;
    return searchBy
      ? {
          ...(searchBy === 'username'
            ? { username: { contains: searchKeyword } }
            : { [searchBy]: searchKeyword }),
        }
      : {};
  };
}
