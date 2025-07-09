import { NextFunction, Request, Response } from 'express';
import { CheckRolePermission } from 'modules/user/applications/usecase/auth/CheckRolePermission';
import { PermissionRepository } from 'modules/user/infrastructures/repositories/PermissionRepository';
import { AppError, errorKinds } from 'utils/error-handling';

const checkPermissionUseCase = new CheckRolePermission(
  new PermissionRepository()
);

export const checkPermissionMiddleware = (permission: {
  action: string;
  resource: string;
}) => {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      const roleID = 1; //TODO: get user role;
      if (!roleID)
        throw AppError.new(errorKinds.notAuthorized, 'Missing user role');

      const hasPermission = await checkPermissionUseCase.execute({
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
