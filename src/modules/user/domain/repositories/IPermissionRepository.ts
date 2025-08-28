import { Permission } from '../entities/Permission';

export interface IPermissionRepository {
  getAll(): Promise<Permission[]>;
  getPermissionByRoleID(roleID: number): Promise<Permission[]>;
}
