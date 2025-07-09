import { inject, injectable } from 'tsyringe';
import { IUserUsecase } from './interfaces/user.usecase.interface';
import { UserResponseDto } from './dtos/user.response.dto';
import Pagination from 'utils/pagination/Pagination';
import { GetAllUserRequestDto } from './dtos/user.request.dto';
import { catchErrorAsync } from 'utils/error-handling';
import { IUserRepository } from './interfaces/user.repo.interface';

@injectable()
export class UserUsecase implements IUserUsecase {
  constructor(
    @inject('IUserRepository') private readonly _userRepo: IUserRepository
  ) {}

  async getUserListAsync(
    params: GetAllUserRequestDto
  ): Promise<Pagination<UserResponseDto[]>> {
    const pageNum = params.page || 1;
    const limitNum = params.limit || 10;

    const [error, results] = await catchErrorAsync(
      this._userRepo.getAllUsersAsync({
        limit: limitNum,
        page: pageNum,
        searchBy: params.searchBy,
        searchKeyword: params.searchKeyword,
      })
    );
    if (error) {
      throw error;
    }
    const paginationResult = Pagination.new(
      pageNum,
      limitNum,
      results.totalCount,
      results.users
    ).getResult();
    return paginationResult;
  }
}
