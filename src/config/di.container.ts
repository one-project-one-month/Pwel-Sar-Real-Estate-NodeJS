import 'reflect-metadata';
import { AgentRepository } from 'modules/agent/agent.repository';
import { IAgentRepository } from 'modules/agent/interfaces/agent.repo.interface';
import { AuthRepository } from 'modules/auth/auth.repository';
import AuthUseCase from 'modules/auth/auth.usecase';
import { IAuthRepository } from 'modules/auth/interfaces/auth.repo.interface';
import { IAuthUseCase } from 'modules/auth/interfaces/auth.usecase.interface';
import { container } from 'tsyringe';

// usecases
container.registerSingleton<IAuthUseCase>('IAuthUseCase', AuthUseCase);

// repositories
container.registerSingleton<IAuthRepository>('IAuthRepository', AuthRepository);
container.registerSingleton<IAgentRepository>(
  'IAgentRepository',
  AgentRepository
);

export { container };
