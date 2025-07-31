import { NextFunction, Request, Response } from 'express';
import GetUserListUseCase from 'modules/user/applications/usecase/GetUserListUseCase';
import { UserRepository } from 'modules/user/infrastructures/repositories/UserRepository';
import { AppError, errorKinds } from 'utils/error-handling';

import { GetUserListParamType } from '../params/getUserlistParamSchema';
import { GetUserWishlistUseCase } from 'modules/user/applications/usecase/GetUserWishlistUseCase';

const getUserListUseCase = new GetUserListUseCase(new UserRepository());

class UsersController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { limit, page, search, searchBy } = req.query;
      const pageNum = parseInt(page as string, 10) || undefined;
      const limitNum = parseInt(limit as string, 10) || undefined;
      const result = await getUserListUseCase.execute({
        limit: limitNum,
        page: pageNum,
        search: search as string | undefined,
        searchBy: searchBy as GetUserListParamType['searchBy'],
      });
      res.status(200).json(result);
    } catch (error) {
      error instanceof AppError
        ? next(error)
        : next(
            AppError.new(
              errorKinds.internalServerError,
              'userController : internal Server Error'
            )
          );
    }
  }

  async getWishlist(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user as any;
      const getUserWishlistUseCase = new GetUserWishlistUseCase(
        new UserRepository()
      );
      const wishlist = await getUserWishlistUseCase.execute(user.id);
      res.status(200).json(wishlist);
    } catch (error) {
      error instanceof AppError
        ? next(error)
        : next(
            AppError.new(
              errorKinds.internalServerError,
              'userController : internal Server Error'
            )
          );
    }
  }
}

const userController = new UsersController();
export default userController;
