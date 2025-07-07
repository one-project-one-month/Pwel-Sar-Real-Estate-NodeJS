import { Request, Response, NextFunction } from "express";
import { CheckRolePermission } from "modules/user/applications/usecase/auth/CheckRolePermission";
import { PermissionRepository } from "modules/user/infrastructures/repositories/PermissionRepository";
import { AppError, errorKinds } from "utils/error-handling";

const checkPermissionUseCase = new CheckRolePermission(new PermissionRepository());

export const checkPermission = (permission: { resource: string; action: string }) => {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      const roleName = req.user?.role_id;
      if (!roleName) throw AppError.new(errorKinds.notAuthorized, "Missing user role");

      const isAllowed = await checkPermissionUseCase.execute({
        roleName,
        resource: permission.resource,
        action: permission.action,
      });

      if (!isAllowed) {
        throw AppError.new(errorKinds.forbidden, "User not allowed to perform this action");
      }

      next();
    } catch (e) {
      next(e instanceof AppError ? e : AppError.new(errorKinds.internalServerError, "Server Error"));
    }
  };
};