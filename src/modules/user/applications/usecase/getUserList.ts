import { IUserRepository } from "modules/user/domain/repositories";
import { AppError, catchErrorAsync } from "utils/error-handling";

interface IUserCase {
  execute(param: any): Promise<UserDTO>; // :TODO should return DTO
}

export class GetUserListUseCase implements IUserCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(param: any): Promise<UserDTO> {
    const [rawUsers, error] = await catchErrorAsync(
      this.userRepository.getAll()
    );
    if (error) throw error;
    return new UserDTO(rawUsers);
  }
}
