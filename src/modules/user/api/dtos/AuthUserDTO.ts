export class AuthUser {
  createdAt: Date;
  email: string;
  id: number;
  password: string;
  photo?: string;
  roleId: number;
  updatedAt: Date;
  username: string;

  constructor(id, email, username, password, roleId, updatedAt, createdAt) {
    this.createdAt = createdAt;
    this.email = email;
    this.username = username;
    this.id = id;
    this.roleId = roleId;
    this.updatedAt = updatedAt;
  }
}
