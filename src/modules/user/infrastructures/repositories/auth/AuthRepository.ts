import { User } from "modules/user/domain/entitiies/User.entity";
import { IAuthRepository } from "modules/user/domain/repositories/auth/IAuthRepository";
import { prisma } from "libs/prismaClients";
import { AppError } from "utils/error-handling";

export class AuthRepository implements IAuthRepository {
	async findByEmail(email: string): Promise<User | null> {
		try {
			const user = await prisma.user.findUnique({ where: { email } });
			if (!user) return null;

			return new User({
				id: user.id,
				email: user.email,
				password: user.password,
				username: user.username,
				roleId: user.roleId,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
			});
		} catch (error) {
			throw AppError.new("internalErrorServer", "Cannot find user");
		}
	}

	async findById(id: number): Promise<User> {
		try {
			const user = await prisma.user.findUnique({ where: { id } });
			if (!user) {
				throw AppError.new("badRequest", "user not found");
			}
			return new User({
				id: user.id,
				email: user.email,
				password: user.password,
				username: user.username,
				roleId: user.roleId,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
			});
		} catch (error) {
			throw AppError.new(
				"internalErrorServer",
				"prisma error: while getting user by id"
			);
		}
	}
}
