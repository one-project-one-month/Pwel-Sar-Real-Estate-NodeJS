import "reflect-metadata";
import { container } from "tsyringe";
import { IAuthUseCase } from "modules/auth/interfaces/auth.usecase.interface";
import AuthUseCase from "modules/auth/auth.usecase";
import { IAuthRepository } from "modules/auth/interfaces/auth.repo.interface";
import { AuthRepository } from "modules/auth/auth.repository";

container.registerSingleton<IAuthUseCase>("IAuthUseCase", AuthUseCase);
container.registerSingleton<IAuthRepository>("IAuthRepository", AuthRepository);

export { container };
