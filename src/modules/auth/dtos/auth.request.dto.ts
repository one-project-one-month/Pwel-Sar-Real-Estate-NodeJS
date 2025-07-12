export class UserRegistrationRequestDto {
  username: string;
  email: string;
  password: string;
  roleId: number;
  photo?: string;

  constructor(
    username: string,
    email: string,
    password: string,
    roleId: number,
    photo?: string
  ) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.roleId = roleId;
    this.photo = photo;
  }
}
