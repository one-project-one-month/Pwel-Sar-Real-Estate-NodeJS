import { User } from 'entities';
import { GetAllUserRequestDto as GetAllUsersRequestDto } from '../dtos/user.request.dto';
import { GetAllUserResponseDto as GetAllUsersResponseDto } from '../dtos/user.response.dto';

export interface IUserRepository {
  getAllUsersAsync: (
    params: GetAllUsersRequestDto
  ) => Promise<GetAllUsersResponseDto>;
  findUserById: (id: number) => Promise<User>;
  createUserAsync: (data: any) => Promise<User>;
  updateUserAsync: (data: any) => Promise<User>;
}
