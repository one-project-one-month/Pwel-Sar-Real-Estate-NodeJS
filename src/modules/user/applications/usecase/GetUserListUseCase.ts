import { GetUserListParamType } from 'modules/user/api/params/getUserlistParamSchema';
import { GetAllRequestType } from 'modules/user/domain/repositories';
import { UserRepository } from 'modules/user/infrastructures/repositories/UserRepository';
import { catchErrorAsync } from 'utils/error-handling';
import Pagination from 'utils/pagination/Pagination';

import { UserDTO } from '../dtos/UserDTO';

class GetUserListUseCase {
  constructor(private readonly userRepository: UserRepository) {}
  async execute(params: GetUserListParamType): Promise<Pagination<UserDTO[]>> {
    const pageNum = params.page || 0;
    const limitNum = params.limit || 20;

    const [error, results] = await catchErrorAsync(
      this.userRepository.getAll({
        limit: limitNum,
        page: pageNum,
        searchBy: params.searchBy as GetAllRequestType['searchBy'],
        searchKeyword: params.search,
      })
    );
    if (error) {
      throw error;
    }
    const userLists = results.users.map((user) => new UserDTO(user));
    const paginationResult = Pagination.new(
      pageNum,
      limitNum,
      results.totalCount,
      userLists
    ).getResult();
    return paginationResult;
  }
}

export default GetUserListUseCase;
