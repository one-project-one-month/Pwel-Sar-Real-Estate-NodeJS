export type UserRegistrationRequestDto = {
  username: string;
  email: string;
  password: string;
  roleId: number;
  photo?: string;
};

export type UserLoginRequestDto = {
  email: string;
  passwrod: string;
};

export type CheckPermissionRequest = {
  roleID: number;
  resource: string;
  action: string;
};
