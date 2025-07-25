import { NextFunction, Request, Response } from 'express';
import {
  CreatePropertyOwnerUseCase,
  GetOwnerListUseCase,
  GetPropertyOwnerByIdUseCase,
} from 'modules/user/applications/usecase/OwnerUsecase';
import { PropertyOwnerRepository } from 'modules/user/infrastructures/repositories/OwnerRepository';
import { AppError, errorKinds } from 'utils/error-handling/AppError';
import { catchErrorAsync } from 'utils/error-handling/CatchError';

import { GetOwnerListParamType } from '../params/getOwnerListParam';

export interface AuthenticatedRequest extends Request {
  user?: {
    email: string;
    id: number;
    roleId: number;
  };
}

const getPropertyOwnerList = new GetOwnerListUseCase(
  new PropertyOwnerRepository()
);

const getPropertyOwnerByIdUseCase = new GetPropertyOwnerByIdUseCase(
  new PropertyOwnerRepository()
);

const createPropertyOwnerUseCase = new CreatePropertyOwnerUseCase(
  new PropertyOwnerRepository()
);

class OwnerController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      //   const authReq = req as AuthenticatedRequest;
      //   const authReq = req.user;
      //   const userId = authReq?.id;

      const user = req.user;

      console.log(user);
      console.log(req.body);

      if (!user) {
        return next(
          AppError.new(errorKinds.notAuthorized, 'User not authenticated')
        );
      }

      const { address, nrcNo, phone } = req.body;

      const result = await createPropertyOwnerUseCase.execute({
        address,
        nrcNo,
        phone,
        user,
        // userId,
      });

      res.status(200).json(result);
    } catch (error) {
      console.error('Error in ownerController.create:', error);
      next(
        error instanceof AppError
          ? error
          : AppError.new(
              errorKinds.internalServerError,
              'Unexpected error during owner creation'
            )
      );
    }
  }
  async findById(req: Request, res: Response, next: NextFunction) {
    const [error, owner] = await catchErrorAsync(
      getPropertyOwnerByIdUseCase.execute(Number(req.params.id))
    );

    console.log(owner);

    if (error) return next(error);

    res.status(200).json(owner);
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    // const [owners, error] = await catchErrorAsync(getPropertyOwnerList.execute({}))
    // if (error) return next(error);
    // res.status(200).json(owners);

    try {
      const { limit, page, search, searchBy } = req.query;
      const pageNum = parseInt(page as string, 10) || undefined;
      const limitNum = parseInt(limit as string, 10) || undefined;
      const result = await getPropertyOwnerList.execute({
        limit: limitNum,
        page: pageNum,
        search: search as string | undefined,
        searchBy: searchBy as GetOwnerListParamType['searchBy'],
      });
      res.status(200).json(result);
    } catch (error) {
      console.error('Error in getAll:', error);
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

const ownerController = new OwnerController();
export default ownerController;
