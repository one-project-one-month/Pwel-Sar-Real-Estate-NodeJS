import { prisma } from "libs/prismaClients";
import { Permission } from "modules/user/domain/entitiies/Permission";
import { IPermissionRepository } from "modules/user/domain/repositories/IPermissionRepository";
import { AppError, catchErrorAsync, errorKinds } from "utils/error-handling";

export class PermissionRepository implements IPermissionRepository {
    async getAll(): Promise<Permission[]> {
        const [errors, rawPermission] = await catchErrorAsync(
            prisma.permission.findMany()
        );
        if (errors || !rawPermission) throw AppError.new(errorKinds.internalServerError, "prisma error: while getting all permissions");
        return rawPermission.map(permission => new Permission({
            'id': permission.id,
            'action': permission.action,
            'resource': permission.resource
        }));
    }

    async getPermissionByRoleID(roleID: number): Promise<Permission[]> {
        const [errors, rawPermission] = await catchErrorAsync(
            prisma.permission.findMany({ where: {
                roleId: roleID
            }})
        );
        if (errors || !rawPermission) throw AppError.new(errorKinds.internalServerError, "prisma error: while getting all permissions");
        return rawPermission.map(permission => new Permission({
            'id': permission.id,
            'action': permission.action,
            'resource': permission.resource
        }));
    }
}

