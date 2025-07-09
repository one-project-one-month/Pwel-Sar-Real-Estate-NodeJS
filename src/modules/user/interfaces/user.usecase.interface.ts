import Pagination from 'utils/pagination/Pagination';
import { GetAllUserRequestDto } from '../dtos/user.request.dto';
import { UserResponseDto } from '../dtos/user.response.dto';

export interface IUserUsecase {
  getUserListAsync(
    params: GetAllUserRequestDto
  ): Promise<Pagination<UserResponseDto[]>>;
}
