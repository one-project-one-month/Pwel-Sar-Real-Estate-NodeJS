import { AgentProfile } from "entities";
import { UserDTO } from "modules/user/applications/dtos/UserDTO";

export class AgentResponseDto {
  id: number;
  cnaNumber: string;
  licenseNumber: number;
  user?: UserDTO | null;
  isApproved: boolean;
  approvedAt?: Date | null;
  approvedById?: number | null;

  constructor(agent: AgentProfile) {
    this.id = agent.id;
    this.cnaNumber = agent.cnaNumber;
    this.licenseNumber = agent.licenseNumber;
    this.isApproved = agent.isApproved;
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
