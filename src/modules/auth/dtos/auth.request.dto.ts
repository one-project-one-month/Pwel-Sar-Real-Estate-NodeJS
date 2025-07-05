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

export class AgentRegisterRequestDto {
  cnaNumber: string;
  licenseNumber: number;
  user: UserRegistrationRequestDto;

  constructor(
    cnaNumber: string,
    licenseNumber: number,
    user: UserRegistrationRequestDto
  ) {
    this.cnaNumber = cnaNumber;
    this.licenseNumber = licenseNumber;
    this.user = user;
  }
}

export class AgentRegistrationApproveRequestDto {
  agentId: number;
  approved: boolean;

  constructor(agentId: number, approved: boolean) {
    this.agentId = agentId;
    this.approved = approved;
  }
}
