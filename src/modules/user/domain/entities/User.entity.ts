import { AppError } from 'utils/error-handling';

interface UserParams {
  createdAt: Date;
  email: string;
  id: number;
  password: string;
  photo?: null | string;
  roleId: number;
  updatedAt: Date;
  username: string;
}
export class User {
  createdAt: Date;
  email: string;
  id: number;
  password: string;
  photo?: null | string;
  roleId: number;
  updatedAt: Date;
  username: string;

  constructor({
    createdAt,
    email,
    id,
    password,
    photo,
    roleId,
    updatedAt,
    username,
  }: UserParams) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.roleId = roleId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.photo = photo;
  }

  chanageRole(roleId: number) {
    //:TODO
    const isAdminAlready = true; //:TODO check admin
    if (isAdminAlready) {
      throw AppError.new('forbidden', "you can't change role");
    }
    this.roleId = roleId;
  }
  isAdmin(): boolean {
    return this.roleId === 1; //:TODO
  }
}
