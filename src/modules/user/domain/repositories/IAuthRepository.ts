import { User } from "../entitiies/User.entity";
import { Token } from "../entitiies/Token.entity";

export interface IAuthRepository {
	create(data: any): Promise<User>;
	findByEmail(email: string): Promise<User | null>;
	createRefreshToken({
		refreshToken,
		userId,
		expiresAt,
	}: {
		refreshToken: string;
		userId: number;
		expiresAt: Date;
	}): Promise<void>;
	findToken(userId: number): Promise<Token | null>;
	deleteToken(refreshToken: string): Promise<void>;
}
