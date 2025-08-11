import { AgentRating } from './AgentRating.entity';

export enum AgentProfileStatus {
  // eslint-disable-next-line no-unused-vars
  Approved = 'Approved',
  // eslint-disable-next-line no-unused-vars
  Pending = 'Pending',
  // eslint-disable-next-line no-unused-vars
  Rejected = 'Rejected',
}

// export interface AgentUser {
//     '
// }

export interface IAgent {
  approvedAt?: Date | null;
  approvedById?: null | number;
  id: number;
  licenseNumber: string;
  nrcNumber: string;
  ratings?: AgentRating[];
  status: AgentProfileStatus;
  user?: any;
  userId: number;
}

export class Agent {
  approvedAt?: Date | null;
  approvedById?: null | number;
  id: number;
  licenseNumber: string;
  nrcNumber: string;
  ratings?: AgentRating[];
  status: AgentProfileStatus;
  user?: any;
  userId: number;

  constructor(params: IAgent) {
    this.id = params.id;
    this.userId = params.userId;
    this.nrcNumber = params.nrcNumber;
    this.licenseNumber = params.licenseNumber;
    this.user = params.user;
    this.status = params.status;
    this.approvedAt = params.approvedAt;
    this.approvedById = params.approvedById;
    this.ratings = params.ratings;
  }
}
