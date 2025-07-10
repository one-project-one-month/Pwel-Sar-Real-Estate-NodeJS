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
const GetUserListUseCase_1 = __importDefault(require("modules/user/applications/usecase/GetUserListUseCase"));
const UserRepository_1 = require("modules/user/infrastructures/repositories/UserRepository");
const error_handling_1 = require("utils/error-handling");
const getUserListUseCase = new GetUserListUseCase_1.default(new UserRepository_1.UserRepository());
class UsersController {
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { page, limit, search, searchBy } = req.query;
                const pageNum = parseInt(page, 10) || undefined;
                const limitNum = parseInt(limit, 10) || undefined;
                const result = yield getUserListUseCase.execute({
                    page: pageNum,
                    limit: limitNum,
                    search: search,
                    searchBy: searchBy
                });
                res.status(200).json(result);
            }
            catch (error) {
                error instanceof error_handling_1.AppError
                    ? next(error)
                    : next(error_handling_1.AppError.new(error_handling_1.errorKinds.internalServerError, "userController : internal Server Error"));
            }
        });
    }
}
const userController = new UsersController();
exports.default = userController;
