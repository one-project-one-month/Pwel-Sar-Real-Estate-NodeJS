import { NextFunction, Request, Response } from "express";
import { GetUserListUseCase } from "modules/user/applications/usecase/getUserList";
import { UserRepository } from "modules/user/infrastructures/repositories/UserRepository";
import { AppError, catchErrorAsync } from "utils/error-handling";

const getUserListUseCase = new GetUserListUseCase(new UserRepository());

class UsersController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        const [users, error] = await catchErrorAsync(getUserListUseCase.execute({}));
        if (error) return next(error);
        return res.status(200).json(users);
    }
}

const userController = new UsersController();
export default userController;
