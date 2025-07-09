import { Permission, User } from 'entities';

export type GetAllUserResponseDto = {
  users: UserResponseDto[];
  totalCount: number;
};

export class PermissionResponseDto {
  id: number;
  action: string;
  resource: string;

  constructor(permission: Permission) {
    this.id = permission.id;
    this.action = permission.action;
    this.resource = permission.resource;
  }
}

export class UserResponseDto {
  id: number;
  username: string;
  email: string;
  roleId: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(user: User) {
    this.id = user.id;
    this.username = user.username;
    this.email = user.email;
    this.roleId = user.roleId;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
