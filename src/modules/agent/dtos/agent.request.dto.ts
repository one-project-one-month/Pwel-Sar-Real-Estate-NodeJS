import { UserRegistrationRequestDto } from "modules/auth/dtos/auth.request.dto";
import { AgentProfileStatus } from "../../../../generated/prisma";

interface AgentRegisterRequestDtoParams {
  cnaNumber: string;
  licenseNumber: number;
  user: UserRegistrationRequestDto;
}

export class AgentRegisterRequestDto {
  cnaNumber: string;
  licenseNumber: number;
  user: UserRegistrationRequestDto;

  constructor(params: AgentRegisterRequestDtoParams) {
    this.cnaNumber = params.cnaNumber;
    this.licenseNumber = params.licenseNumber;
    this.user = params.user;
  }
}

interface AgentRegistrationApproveRequestDtoParams {
  agentId: number;
  status: AgentProfileStatus;
}

export class AgentRegistrationApproveRequestDto {
  agentId: number;
  status: AgentProfileStatus;

  constructor(params: AgentRegistrationApproveRequestDtoParams) {
    this.agentId = params.agentId;
    this.status = params.status;
  }
}
