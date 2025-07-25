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
Object.defineProperty(exports, "__esModule", { value: true });
const GetOwnerListUseCase_1 = require("modules/user/applications/usecase/GetOwnerListUseCase");
const OwnerRepository_1 = require("modules/user/infrastructures/repositories/OwnerRepository");
const CatchError_1 = require("utils/error-handling/CatchError");
const AppError_1 = require("utils/error-handling/AppError");
const getPropertyOwnerList = new GetOwnerListUseCase_1.GetOwnerListUseCase(new OwnerRepository_1.PropertyOwnerRepository());
const getPropertyOwnerByIdUseCase = new GetOwnerListUseCase_1.GetPropertyOwnerByIdUseCase(new OwnerRepository_1.PropertyOwnerRepository());
const createPropertyOwnerUseCase = new GetOwnerListUseCase_1.CreatePropertyOwnerUseCase(new OwnerRepository_1.PropertyOwnerRepository());
class OwnerController {
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // const [owners, error] = await catchErrorAsync(getPropertyOwnerList.execute({}))
            // if (error) return next(error);
            // res.status(200).json(owners);
            try {
                const { page, limit, search, searchBy } = req.query;
                const pageNum = parseInt(page, 10) || undefined;
                const limitNum = parseInt(limit, 10) || undefined;
                const result = yield getPropertyOwnerList.execute({
                    page: pageNum,
                    limit: limitNum,
                    search: search,
                    searchBy: searchBy
                });
                res.status(200).json(result);
            }
            catch (error) {
                console.error("Error in getAll:", error);
                error instanceof AppError_1.AppError
                    ? next(error)
                    : next(AppError_1.AppError.new(AppError_1.errorKinds.internalServerError, "userController : internal Server Error"));
            }
        });
    }
    findById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const [owner, error] = yield (0, CatchError_1.catchErrorAsync)(getPropertyOwnerByIdUseCase.execute(Number(req.params.id)));
            if (error)
                return next(error);
            res.status(200).json(owner);
        });
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const [owner, error] = yield (0, CatchError_1.catchErrorAsync)(createPropertyOwnerUseCase.execute(req.body));
            if (error)
                return next(error);
            res.status(200).json(owner);
        });
    }
}
const ownerController = new OwnerController();
exports.default = ownerController;
