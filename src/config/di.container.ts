import 'reflect-metadata';
import { container } from 'tsyringe';
import { IAuthUsecase } from 'modules/auth/interfaces/auth.usecase.interface';
import AuthUsecase from 'modules/auth/auth.usecase';
import { IAuthRepository } from 'modules/auth/interfaces/auth.repo.interface';
import { AuthRepository } from 'modules/auth/auth.repository';
import { IAgentUsecase } from 'modules/agent/interfaces/agent.usecase.interface';
import { AgentUsecase } from 'modules/agent/agent.usecase';
import { IAgentRepository } from 'modules/agent/interfaces/agent.repo.interface';
import { AgentRepository } from 'modules/agent/agent.repository';
import { IUserRepository } from 'modules/user/interfaces/user.repo.interface';
import { UserRepository } from 'modules/user/user.repository';
import { IUserUsecase } from 'modules/user/interfaces/user.usecase.interface';
import { UserUsecase } from 'modules/user/user.usecase';

// usecases
container.registerSingleton<IAuthUsecase>('IAuthUsecase', AuthUsecase);
container.registerSingleton<IAgentUsecase>('IAgentUsecase', AgentUsecase);
container.registerSingleton<IUserUsecase>('IUserUsecase', UserUsecase);

// repositories
container.registerSingleton<IAuthRepository>('IAuthRepository', AuthRepository);
container.registerSingleton<IAgentRepository>(
  'IAgentRepository',
  AgentRepository
);
container.registerSingleton<IUserRepository>('IUserRepository', UserRepository);

export { container };
