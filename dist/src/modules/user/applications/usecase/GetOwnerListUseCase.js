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
exports.CreatePropertyOwnerUseCase = exports.GetPropertyOwnerByIdUseCase = exports.GetOwnerListUseCase = void 0;
const prismaClients_1 = require("libs/prismaClients");
const CatchError_1 = require("utils/error-handling/CatchError");
const Pagination_1 = __importDefault(require("utils/pagination/Pagination"));
const OwnerDTO_1 = require("../dtos/OwnerDTO");
class GetOwnerListUseCase {
    constructor(OwnerRepo) {
        this.OwnerRepo = OwnerRepo;
    }
    execute(params) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const pageNum = params.page || 0;
            const limitNum = params.limit || 20;
            const [error, results] = yield (0, CatchError_1.catchErrorAsync)(this.OwnerRepo.getAll({
                searchBy: params.searchBy,
                searchKeyword: (_a = params.search) !== null && _a !== void 0 ? _a : "",
                page: pageNum,
                limit: limitNum,
            }));
            if (error) {
                throw error;
            }
            const ownerLists = results.owners.map(user => new OwnerDTO_1.OwnerDTO(user));
            const paginationResult = Pagination_1.default.new(pageNum, limitNum, results.totalCount, ownerLists).getResult();
            return paginationResult;
        });
    }
}
exports.GetOwnerListUseCase = GetOwnerListUseCase;
class GetPropertyOwnerByIdUseCase {
    constructor(OwnerRepo) {
        this.OwnerRepo = OwnerRepo;
    }
    execute(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [owner, error] = yield (0, CatchError_1.catchErrorAsync)(this.OwnerRepo.findById(id));
            if (error)
                throw error;
            return new OwnerDTO_1.OwnerDTO(owner);
        });
    }
}
exports.GetPropertyOwnerByIdUseCase = GetPropertyOwnerByIdUseCase;
class CreatePropertyOwnerUseCase {
    constructor(OwnerRepo) {
        this.OwnerRepo = OwnerRepo;
    }
    execute(param) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Received param for creation:", param);
            const user = yield prismaClients_1.prisma.user.findUnique({
                where: { email: param.userEmail }
            });
            if (!user) {
                throw new Error("User not found with given identifier");
            }
            const createData = Object.assign(Object.assign({}, param), { userId: user.id });
            const [owner, error] = yield (0, CatchError_1.catchErrorAsync)(this.OwnerRepo.create(createData));
            if (error)
                throw error;
            return new OwnerDTO_1.OwnerDTO(owner);
        });
    }
}
exports.CreatePropertyOwnerUseCase = CreatePropertyOwnerUseCase;
