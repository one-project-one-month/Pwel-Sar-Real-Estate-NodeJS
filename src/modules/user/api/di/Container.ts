import { IAgentRepository } from 'modules/user/domain/repositories/IAgentRepository';
import { IAuthRepository } from 'modules/user/domain/repositories/IAuthRepository';
import { IUserRepository } from 'modules/user/domain/repositories/IUserRepository';
import { AgentRepository } from 'modules/user/infrastructures/repositories/AgentRepository';
import { AuthRepository } from 'modules/user/infrastructures/repositories/AuthRepository';
import { UserRepository } from 'modules/user/infrastructures/repositories/UserRepository';

export class Container {
    static agentRepository: IAgentRepository = new AgentRepository();
    static authRepository: IAuthRepository = new AuthRepository();
    static userRepository: IUserRepository = new UserRepository();
}
