import { GetUserListParamType } from "modules/user/api/params/getUserlistParamSchema";
import { UserRepository } from "modules/user/infrastructures/repositories/UserRepository";
import { AppError, catchError, catchErrorAsync } from "utils/error-handling";
import Pagination from "utils/pagination/Pagination";
import { UserDTO } from "../dtos/UserDTO";
import { GetAllRequestType } from "modules/user/domain/repositories";

class GetUserListUseCase {
    constructor(private readonly userRepository: UserRepository) {}
    async execute(params: GetUserListParamType): Promise<Pagination<UserDTO[]>> {
        const pageNum = params.page || 0;
        const limitNum = params.limit || 20;

        const [error, results] = await catchErrorAsync(this.userRepository.getAll({
            searchBy: params.searchBy as GetAllRequestType['searchBy'],
            searchKeyword: params.search,
            page: pageNum,
            limit: limitNum,
        }))
        if(error){
            throw error
        }
        const userLists = results.users.map(user => new UserDTO(user));
        const paginationResult = Pagination.new(pageNum, limitNum, results.totalCount, userLists).getResult();
        return paginationResult;
    }
}

export default GetUserListUseCase;