import { IRegisterRepository } from "modules/user/domain/repositories/auth/IRegisterRepository";
import { AppError } from "utils/error-handling";
import { RegisterDTO } from "../../dtos/auth/RegisterDTO";

interface IRegisterUseCase {
  execute(data: { username: string; email: string; password: string }): Promise<RegisterDTO>;
}

export class RegisterUseCase implements IRegisterUseCase {
  constructor(private readonly registerRepository: IRegisterRepository) {}

  async execute(data: { username: string; email: string; password: string, roleId: number }): Promise<RegisterDTO> {
    const existUser = await this.registerRepository.findByEmail(data.email);
    if (existUser) {
      throw AppError.new("badRequest", "Email already exists");
    }

    const user = await this.registerRepository.create(data);
    return new RegisterDTO(user);
  }
}
