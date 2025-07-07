import { AuthRepository } from "modules/user/infrastructures/repositories/AuthRepository";
import { IAuthRepository } from "modules/user/domain/repositories/IAuthRepository";
import { UserDTO } from "../../dtos/UserDTO";
import { AppError, catchErrorAsync } from "utils/error-handling";

interface IUser {
	execute(param: any): Promise<UserDTO>;
}

export class RegisterUseCase implements IUser {
	constructor(private readonly authRepository: IAuthRepository) {}

	async execute(data: any): Promise<UserDTO> {
		const existUser = await this.authRepository.findByEmail(data.email);

		if (existUser) {
			throw AppError.new("badRequest", "Email already exists");
			// throw new Error("badRequest", "Email already exists");
		}

		const [user, error] = await catchErrorAsync(
			this.authRepository.create({
				id: data.id,
				username: data.username,
				email: data.email,
				password: data.password,
				roleId: data.roleId || 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			})
		);
		if (error) throw error;
		const registerDTO = new UserDTO(user);
		return registerDTO;
	}
}
