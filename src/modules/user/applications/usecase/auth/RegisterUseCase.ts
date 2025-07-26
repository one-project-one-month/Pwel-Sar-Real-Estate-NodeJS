import { IAuthRepository } from 'modules/user/domain/repositories/IAuthRepository';
import { AppError, catchErrorAsync } from 'utils/error-handling';

import { UserDTO } from '../../dtos/UserDTO';

interface IUser {
  // eslint-disable-next-line no-unused-vars
  execute(param: any): Promise<UserDTO>;
}

export class RegisterUseCase implements IUser {
  // eslint-disable-next-line no-unused-vars
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(data: any): Promise<UserDTO> {
    const existUser = await this.authRepository.findByEmail(data.email);

    if (existUser) {
      throw AppError.new('badRequest', 'Email already exists');
    }

    const [error, user] = await catchErrorAsync(
      this.authRepository.create({
        createdAt: new Date(),
        email: data.email,
        id: data.id,
        password: data.password,
        roleId: data.roleId ?? 2,
        updatedAt: new Date(),
        username: data.username,
      })
    );
    if (error) throw error;
    const registerDTO = new UserDTO(user);
    return registerDTO;
  }
}
