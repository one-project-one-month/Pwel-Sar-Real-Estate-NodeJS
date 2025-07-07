import { IAuthRepository } from "modules/user/domain/repositories/IAuthRepository";
import { AppError } from "utils/error-handling";

export class LogoutUseCase {
	constructor(private readonly authRepository: IAuthRepository) {}

	async execute(refreshToken: string): Promise<void> {
		await this.authRepository.deleteToken(refreshToken);
	}
}
