export interface IAgentRating {
  agentId: number;
  createdAt: Date;
  id: number;
  posint: number;
  updatedAt: Date;
  userId: number;
}
export class AgentRating {
  agentId: number;
  createdAt: Date;
  id: number;
  point: number;
  updatedAt: Date;
  userId: number;

  constructor(params: AgentRating) {
    this.id = params.id;
    this.point = params.point;
    this.userId = params.userId;
    this.agentId = params.agentId;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
  }
}
