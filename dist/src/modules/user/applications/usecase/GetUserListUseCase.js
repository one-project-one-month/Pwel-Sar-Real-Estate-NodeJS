"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_handling_1 = require("utils/error-handling");
const Pagination_1 = __importDefault(require("utils/pagination/Pagination"));
const UserDTO_1 = require("../dtos/UserDTO");
class GetUserListUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    execute(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const pageNum = params.page || 0;
            const limitNum = params.limit || 20;
            const [error, results] = yield (0, error_handling_1.catchErrorAsync)(this.userRepository.getAll({
                searchBy: params.searchBy,
                searchKeyword: params.search,
                page: pageNum,
                limit: limitNum,
            }));
            if (error) {
                throw error;
            }
            const userLists = results.users.map(user => new UserDTO_1.UserDTO(user));
            const paginationResult = Pagination_1.default.new(pageNum, limitNum, results.totalCount, userLists).getResult();
            return paginationResult;
        });
    }
}
exports.default = GetUserListUseCase;
