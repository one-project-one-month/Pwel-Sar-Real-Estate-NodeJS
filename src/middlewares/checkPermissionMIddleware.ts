import { NextFunction, Request, Response } from 'express';
import { IAuthUsecase } from 'modules/auth/interfaces/auth.usecase.interface';
import { inject, injectable } from 'tsyringe';
import { AppError, errorKinds } from 'utils/error-handling';

@injectable()
export class CheckPermissionMiddleware {
  constructor(
    @inject('IAuthUsecase') private readonly _authUsecase: IAuthUsecase
  ) {}

  public checkPermissionMiddleware = (permission: {
    action: string;
    resource: string;
  }) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const roleID = 1; // TODO: get user role dynamically

        if (!roleID)
          throw AppError.new(errorKinds.notAuthorized, 'Missing user role');

        const hasPermission = await this._authUsecase.checkRolePermission({
          roleID,
          ...permission,
        });

        if (!hasPermission)
          throw AppError.new(errorKinds.forbidden, "You don't have permission");

        next();
      } catch (e) {
        next(
          e instanceof AppError
            ? e
            : AppError.new(errorKinds.internalServerError, 'Server Error')
        );
      }
    };
  };
}
