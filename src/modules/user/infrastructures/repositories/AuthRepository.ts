import { prisma } from "libs/prismaClients";
import { IAuthRepository } from "modules/user/domain/repositories/IAuthRepository";
import { User } from "modules/user/domain/entitiies/User.entity";
import { Token } from "modules/user/domain/entitiies/Token.entity";
import { AppError } from "utils/error-handling";

import bcrypt from "bcrypt";

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
}
