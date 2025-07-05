import { IAuthRepository } from "modules/user/domain/repositories/auth/IAuthRepository";
import { AppError } from "utils/error-handling";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import {
	LoginDTO,
	LoginResponseDTO,
} from "modules/user/applications/dtos/auth/LoginDTO";

export class LoginUseCase {
	constructor(private readonly authRepository: IAuthRepository) {}

	async execute(dto: LoginDTO): Promise<LoginResponseDTO> {
		const user = await this.authRepository.findByEmail(dto.email);
		if (!user) {
			throw AppError.new("badRequest", "Invalid email or password");
		}
		const isMatch = await bcrypt.compare(dto.password, user.password);
		if (!isMatch) {
			throw AppError.new("badRequest", "Invalid email or password");
		}
		const token = jwt.sign(
			{ id: user.id, email: user.email, roleId: user.roleId },
			process.env.ACCESS_TOKEN_PRIVATE_KEY || "secret",
			{ expiresIn: "1d" }
		);
		return new LoginResponseDTO(user, token);
	}
}
