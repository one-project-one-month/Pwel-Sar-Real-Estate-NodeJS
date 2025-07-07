import { IPermissionRepository } from "modules/user/domain/repositories/IPermissionRepository";
import { AppError, catchErrorAsync } from "utils/error-handling";

type PermissionCheckInput = {
    roleID: number;
    resource: string;
    action: string;
};

export class CheckRolePermission {
    constructor(private readonly permissionRepository: IPermissionRepository) { }

    async execute(params: PermissionCheckInput): Promise<boolean> {
        const [errors, permissons] = await catchErrorAsync(
            this.permissionRepository.getPermissionByRoleID(params.roleID), [AppError]
        );
        if (errors || !permissons) {
            throw AppError.new('internalErrorServer', "prisma error: while getting all permissions");
        }
        return permissons.some((perm) => perm.resource === params.resource && perm.action === params.action);
    }
}