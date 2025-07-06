import { AgentProfile } from "entities";
import { UserDTO } from "modules/user/applications/dtos/UserDTO";
import { AgentProfileStatus } from "../../../../generated/prisma";

export class AgentResponseDto {
  id: number;
  cnaNumber: string;
  licenseNumber: number;
  user?: UserDTO | null;
  status: AgentProfileStatus;
  approvedAt?: Date | null;
  approvedById?: number | null;

  constructor(agent: AgentProfile) {
    this.id = agent.id;
    this.cnaNumber = agent.cnaNumber;
    this.licenseNumber = agent.licenseNumber;
    this.status = agent.status;
    this.approvedAt = agent.approvedAt ?? null;
    this.approvedById = agent.approvedById ?? null;

    if (agent.user) {
      this.user = {
        id: agent.user.id,
        username: agent.user.username,
        email: agent.user.email,
        roleId: agent.user.roleId,
        createdAt: agent.user.createdAt,
        updatedAt: agent.user.updatedAt,
      };
    } else {
      this.user = null;
    }
  }
}
