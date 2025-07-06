import { NextFunction, Request, Response } from "express";
import GetUserListUseCase from "modules/user/applications/usecase/GetUserListUseCase";
import { UserRepository } from "modules/user/infrastructures/repositories/UserRepository";
import { AppError, catchErrorAsync, errorKinds } from "utils/error-handling";
import { GetUserListParamType } from "../params/getUserlistParamSchema";

const getUserListUseCase = new GetUserListUseCase(new UserRepository());

class UsersController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const { page, limit, search, searchBy } = req.query;
            const pageNum = parseInt(page as string, 10) || undefined;
            const limitNum = parseInt(limit as string, 10) || undefined;
            const result = await getUserListUseCase.execute({
                page: pageNum,
                limit: limitNum,
                search: search as string | undefined,
                searchBy: searchBy as GetUserListParamType['searchBy']
            });
            res.status(200).json(result);
        } catch(error) {
            error instanceof AppError 
            ? next(error) 
            : next(AppError.new(errorKinds.internalServerError, "userController : internal Server Error"));
        }
    }
}

const userController = new UsersController();
export default userController;
