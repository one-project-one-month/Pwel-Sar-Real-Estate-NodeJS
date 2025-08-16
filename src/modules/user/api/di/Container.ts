import { IAgentRepository } from 'modules/user/domain/repositories/IAgentRepository';
import { IAuthRepository } from 'modules/user/domain/repositories/IAuthRepository';
import { AgentRepository } from 'modules/user/infrastructures/repositories/AgentRepository';
import { AuthRepository } from 'modules/user/infrastructures/repositories/AuthRepository';

export class Container {
  static agentRepository: IAgentRepository = new AgentRepository();
  static authRepository: IAuthRepository = new AuthRepository();
}
