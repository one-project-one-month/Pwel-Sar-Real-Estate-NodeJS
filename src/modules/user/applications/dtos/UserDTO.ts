import { User } from "../../../../entities/index";

export class UserDTO {
  id: number;
  username: string;
  email: string;
  roleId: number;
  createdAt: Date;
  updatedAt: Date;
  photo?: string;

  constructor(user: User) {
    this.id = user.id;
    this.username = user.username;
    this.email = user.email;
    this.photo = user.photo || undefined;
    this.roleId = user.roleId;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
