import { IAuthRepository } from "modules/user/domain/repositories/IAuthRepository";
import { AppError } from "utils/error-handling";
import { generateTokens } from "utils/auth/auth.service";
import bcrypt from "bcrypt";

export class LoginUseCase {
	constructor(private readonly authRepository: IAuthRepository) {}

	async execute({ email, password }: { email: string; password: string }) {
		const user = await this.authRepository.findByEmail(email);

		if (!user)
			throw AppError.new("badRequest", "Invalid email or password");

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch)
			throw AppError.new("badRequest", "Invalid email or password");

		return generateTokens(user);
	}
}
