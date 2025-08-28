export class AgentDTO {
  address: string;
  approvedAt: Date | null;
  approvedById: null | number;
  createdAt: Date;
  id: number;
  licenseNumber: string;
  nrcNumber: string;
  phone: string;
  status: string;
  updatedAt: Date;
  user?: any;
  userId: number;

  constructor(agent: any) {
    this.id = agent.id;
    this.userId = agent.userId;
    this.approvedById = agent.approvedById;
    this.address = agent.address;
    this.licenseNumber = agent.licenseNumber;
    this.nrcNumber = agent.nrcNumber;
    this.phone = agent.phone;
    this.status = agent.status;
    this.createdAt = agent.createdAt;
    this.updatedAt = agent.updatedAt;
    this.approvedAt = agent.approvedAt;
    this.user = agent.user;
  }
}
