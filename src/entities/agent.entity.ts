import { User } from "modules/user/domain/entitiies/User.entity";
import { AgentProfileStatus } from "../../generated/prisma";

type AgentProfileParams = {
  id: number;
  userId: number;
  cnaNumber: string;
  licenseNumber: number;
  user?: User;
  status: AgentProfileStatus;
  approvedById?: number | null;
  approvedAt?: Date | null;
};

export class AgentProfile {
  id: number;
  userId: number;
  cnaNumber: string;
  licenseNumber: number;
  user?: User;
  status: AgentProfileStatus;
  approvedById?: number | null;
  approvedAt?: Date | null;

  constructor(params: AgentProfileParams) {
    this.id = params.id;
    this.userId = params.userId;
    this.cnaNumber = params.cnaNumber;
    this.licenseNumber = params.licenseNumber;
    this.user = params.user;
    this.status = params.status;
    this.approvedAt = params.approvedAt;
    this.approvedById = params.approvedById;
  }
}
