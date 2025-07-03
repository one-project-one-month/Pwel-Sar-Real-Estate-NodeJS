export class RegisterDTO {
  id: number;
  username: string;
  email: string;
  roleId: number;

  constructor(user: any) {
    this.id = user.id;
    this.username = user.username;
    this.email = user.email;
    this.roleId = user.roleId;
  }
}
