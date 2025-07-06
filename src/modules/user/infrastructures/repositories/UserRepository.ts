import { User } from "modules/user/domain/entitiies/User.entity";
import { GetAllRequestType, GetUserListReturnType, IUserRepository } from "modules/user/domain/repositories";
import { prisma } from "../../../../libs/prismaClients";
import { AppError, catchErrorAsync } from "utils/error-handling";
import { error } from "console";

export class UserRepository implements IUserRepository {

    private getListFilter = (params: GetAllRequestType) => {
        const { searchBy, searchKeyword } = params
        return searchBy 
        ? {
            ...(
                searchBy === 'username' ? 
                { username: { contains: searchKeyword } } : 
                { [searchBy]: searchKeyword }
                ),
        } 
        : {}
    }

    async getAll(parmas: GetAllRequestType): Promise<GetUserListReturnType> {
        const { page = 0, limit = 20 } = parmas;
        const [errors, result] = await catchErrorAsync(prisma.$transaction([
            prisma.user.findMany({ 
                where: this.getListFilter(parmas),
                skip: page * limit,
                take: limit,
                orderBy: { createdAt: 'desc' }
            }),
            prisma.user.count({
                where: this.getListFilter(parmas),
            })
        ]))

        console.log(errors)

        if(errors || !result) throw AppError.new('internalErrorServer', "prisma error: while getting all users")
        const [rawUsers, usersCount] = result;
        const users = rawUsers.map(user => new User({
            'id': user.id,
            'email': user.email,
            'password': user.password,
            'username': user.username,
            'roleId': user.roleId,
            'createdAt': user.createdAt,
            'updatedAt': user.updatedAt
        }));
        return {
            users,
            totalCount: usersCount
        }
    }

    async findById(id: number): Promise<User> {
        try {
            const user = await prisma.user.findUnique({ where: { id } });
            if (!user) {
                throw AppError.new('badRequest', "user not found");
            }
            return new User({
                'id': user.id,
                'email': user.email,
                'password': user.password,
                'username': user.username,
                'roleId': user.roleId,
                'createdAt': user.createdAt,
                'updatedAt': user.updatedAt
            });
        } catch (error) {
            throw AppError.new('internalErrorServer', "prisma error: while getting user by id");
        }
    }

    async create(data: any): Promise<User> { //:TODO change any
        const user = await prisma.user.create({ data });
        const newUser = new User({
            'id': user.id,
            'email': user.email,
            'password': user.password,
            'username': user.username,
            'roleId': user.roleId,
            'createdAt': user.createdAt,
            'updatedAt': user.updatedAt
        });
        return newUser;
    }

    async update(data: any): Promise<User> { //:TODO change any
        const user = await prisma.user.update({ where: { id: data.id }, data });
        const updatedUser = new User({
            'id': user.id,
            'email': user.email,
            'password': user.password,
            'username': user.username,
            'roleId': user.roleId,
            'createdAt': user.createdAt,
            'updatedAt': user.updatedAt
        });
        return updatedUser;
    }
}
