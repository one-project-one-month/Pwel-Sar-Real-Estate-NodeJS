import { GetUserListParamType } from 'modules/user/api/params/getUserlistParamSchema';
import {
  GetAllRequestType,
  IAgentRepository,
} from 'modules/user/domain/repositories/IAgentRepository';
import { catchErrorAsync } from 'utils/error-handling';
import Pagination from 'utils/pagination/Pagination';
export class GetAllAgentsUseCase {
  // eslint-disable-next-line no-unused-vars
  constructor(private readonly agentRepository: IAgentRepository) {}
  async execute(params: GetUserListParamType): Promise<Pagination<UserDTO[]>> {
    const pageNum = params.page ?? 0;
    const limitNum = params.limit ?? 20;

    const [error, results] = await catchErrorAsync(
      this.agentRepository.getAllAgent({
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
