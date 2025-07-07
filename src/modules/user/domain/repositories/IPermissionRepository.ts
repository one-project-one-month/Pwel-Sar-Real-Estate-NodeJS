import { Permission } from "../entitiies/Permission";

export interface IPermissionRepository {
    getAll(): Promise<Permission[]>;
    getPermissionByRoleID(roleID: number): Promise<Permission[]>
}