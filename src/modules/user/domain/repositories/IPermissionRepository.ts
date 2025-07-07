import { Permission } from "../entitiies/Permission";

export interface IPermissionRepository {
    getAll(): Promise<Permission[]>;
}