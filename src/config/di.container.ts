import 'reflect-metadata';
import { container } from 'tsyringe';
import { IAuthUseCase } from 'modules/auth/interfaces/auth.usecase.interface';
import AuthUseCase from 'modules/auth/auth.usecase';
import { IAuthRepository } from 'modules/auth/interfaces/auth.repo.interface';
import { AuthRepository } from 'modules/auth/auth.repository';
import { IAgentUseCase } from 'modules/agent/interfaces/agent.usecase.interface';
import { AgentUseCase } from 'modules/agent/agent.usecase';
import { IAgentRepository } from 'modules/agent/interfaces/agent.repo.interface';
import { AgentRepository } from 'modules/agent/agent.repository';
import { IUserRepository } from 'modules/user/interfaces/user.repo.interface';
import { UserRepository } from 'modules/user/user.repository';
import { IUserUsecase } from 'modules/user/interfaces/user.usecase.interface';
import { UserUsecase } from 'modules/user/user.usecase';

// usecases
container.registerSingleton<IAuthUseCase>('IAuthUseCase', AuthUseCase);
container.registerSingleton<IAgentUseCase>('IAgentUseCase', AgentUseCase);
container.registerSingleton<IUserUsecase>('IUserUsecase', UserUsecase);

// repositories
container.registerSingleton<IAuthRepository>('IAuthRepository', AuthRepository);
container.registerSingleton<IAgentRepository>(
  'IAgentRepository',
  AgentRepository
);
container.registerSingleton<IUserRepository>('IUserRepository', UserRepository);

export { container };
