import { User } from "modules/user/domain/entitiies/User.entity";
import { IUserRepository } from "modules/user/domain/repositories";
import { prisma } from "../../../../libs/prismaClients";
import { AppError } from "utils/error-handling";

export class UserRepository implements IUserRepository {
    save: any;
    findByEmail(email: string) {
      throw new Error("Method not implemented.");
    }

    async getAll(): Promise<User[]> {
        try {
            const users = await prisma.user.findMany();
            console.log(users, "repository");
            return users.map((user) => {
                return new User({
                    'id': user.id,
                    'email': user.email,
                    'password': user.password,
                    'username': user.username,
                    'roleId': user.roleId,
                    'createdAt': user.createdAt,
                    'updatedAt': user.updatedAt
                });
            });
        } catch (error) {
            console.log(error);
            throw AppError.new('internalErrorServer', "prisma error: while getting all users");
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
