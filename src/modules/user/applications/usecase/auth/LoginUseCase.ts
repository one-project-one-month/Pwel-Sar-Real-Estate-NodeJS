import { IUserRepository } from "modules/user/domain/repositories";
import { AppError, catchErrorAsync } from "utils/error-handling";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { User } from "modules/user/domain/entitiies/User.entity";

export interface LoginDTO {
	email: string;
	password: string;
}

export class LoginUseCase {
	constructor(private readonly userRepository: IUserRepository) {}

	async execute({
		email,
		password,
	}: LoginDTO): Promise<{ user: User; token: string }> {
		// Find user by email
		const users = await this.userRepository.getAll();
		const user = users.find((u) => u.email === email);
		if (!user) {
			throw AppError.new("badRequest", "Invalid email or password");
		}
		// Compare password
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			throw AppError.new("badRequest", "Invalid email or password");
		}
		// Generate JWT
		const token = jwt.sign(
			{ id: user.id, email: user.email, roleId: user.roleId },
			process.env.JWT_SECRET || "your_jwt_secret",
			{ expiresIn: "1d" }
		);
		return { user, token };
	}
}
