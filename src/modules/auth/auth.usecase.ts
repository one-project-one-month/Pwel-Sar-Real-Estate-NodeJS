import { inject, injectable } from "tsyringe";
import { IAuthUseCase } from "./interfaces/auth.usecase.interface";
import {
  AgentRegisterRequestDto,
  AgentRegistrationApproveRequestDto,
  UserRegistrationRequestDto,
} from "./dtos/auth.request.dto";
import { AgentResponseDto } from "./dtos/auth.response.dto";
import { IAuthRepository } from "./interfaces/auth.repo.interface";
import { AppError } from "utils/error-handling";
import {
  validateAgentCredentials,
  validateUserRegistrationCredentials,
} from "utils/validation.helper";
import { UserDTO } from "modules/user/applications/dtos/UserDTO";

@injectable()
export default class AuthUseCase implements IAuthUseCase {
  constructor(
    @inject("IAuthRepository") private readonly authRepo: IAuthRepository
  ) {}

  async registerAgentAsync(
    req: AgentRegisterRequestDto
  ): Promise<AgentResponseDto | AppError> {
    // validate agent credentials (detailed logics for later)
    const agentCredentialsValidationResult = validateAgentCredentials();
    if (agentCredentialsValidationResult !== null)
      throw AppError.new(
        agentCredentialsValidationResult.error,
        agentCredentialsValidationResult.message
      );

    // add new agent record to the database
    const newUser = await this.registerUserAsync(req.user);
    const newAgent = await this.authRepo.createPendingAgent(req, newUser.id);

    return new AgentResponseDto(newAgent);
  }

  async registerUserAsync(req: UserRegistrationRequestDto): Promise<UserDTO> {
    // validate request
    const userCredentialsValidationResult =
      validateUserRegistrationCredentials(req);
    if (userCredentialsValidationResult !== null)
      throw AppError.new(
        userCredentialsValidationResult.error,
        userCredentialsValidationResult.message
      );

    // add new user to the database and return DTO
    const newUser = await this.authRepo.registerUserAsync(req);
    return new UserDTO(newUser);
  }
}
