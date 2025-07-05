import { IRegisterRepository } from "modules/user/domain/repositories/auth/AuthRepository";
import { AppError, catchErrorAsync } from "utils/error-handling";
import { AuthRepository } from "modules/user/infrastructures/repositories/auth/AuthRepository";
import { RegisterDTO } from "../../dtos/auth/AuthDTO";
import { StatusCode } from "config/Status";

interface IUserCase {
	execute(param: any): Promise<RegisterDTO>;
}
export class RegisterUseCase implements IUserCase {
	constructor(private readonly registerRepository: IRegisterRepository) {}

	async execute(data: any): Promise<RegisterDTO> {
		const existUser = await this.registerRepository.findByEmail(data.email);

		if (existUser) {
			throw AppError.new("badRequest", "Email already exists");
			// throw new Error("badRequest", "Email already exists");
		}

		const [user, error] = await catchErrorAsync(
			this.registerRepository.create({
				username: data.username,
				email: data.email,
				password: data.password,
				roleId: data.roleId || 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			})
		);

		// console.log(error, "user created in usecase");
		// if (error) throw error;
		console.log(user, "user created");
		const registerDTO = new RegisterDTO(user);
		return registerDTO;
	}
}
