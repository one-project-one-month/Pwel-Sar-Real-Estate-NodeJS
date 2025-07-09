import { NextFunction, Request, Response } from 'express';
import { catchErrorAsync } from 'utils/error-handling';
import { GetAllUserRequestDto } from './dtos/user.request.dto';
import { inject, injectable } from 'tsyringe';
import { IUserUsecase } from './interfaces/user.usecase.interface';

@injectable()
export class UserController {
  constructor(
    @inject('IUserUsecase') private readonly _userUsecase: IUserUsecase
  ) {}

  async getAllUsersAsync(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const { limit, page, search, searchBy } = req.query;

    const pageNum = parseInt(page as string, 10) || undefined;
    const limitNum = parseInt(limit as string, 10) || undefined;

    const [error, result] = await catchErrorAsync(
      this._userUsecase.getUserListAsync({
        limit: limitNum,
        page: pageNum,
        searchBy: searchBy as GetAllUserRequestDto['searchBy'],
        searchKeyword: search as string | undefined,
      })
    );

    if (error) {
      return next(error);
    }

    return res.status(200).json(result);
  }
}
