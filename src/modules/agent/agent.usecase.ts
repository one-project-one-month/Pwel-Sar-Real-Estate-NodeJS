import { AppError, catchError } from "utils/error-handling";
import {
  AgentRegisterRequestDto,
  AgentRegistrationApproveRequestDto,
} from "./dtos/agent.request.dto";
import { AgentResponseDto } from "./dtos/agent.response.dto";
import { IAgentUseCase } from "./interfaces/agent.usecase.interface";
import { validateAgentCredentials } from "utils/validation.helper";
import { inject, injectable } from "tsyringe";
import { IAgentRepository } from "./interfaces/agent.repo.interface";
import { IAuthUseCase } from "modules/auth/interfaces/auth.usecase.interface";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@injectable()
export class AgentUseCase implements IAgentUseCase {
  constructor(
    @inject("IAgentRepository") private readonly _agentRepo: IAgentRepository,
    @inject("IAuthUseCase") private readonly _authUsecase: IAuthUseCase
  ) {}

  async registerAgentAsync(
    req: AgentRegisterRequestDto
  ): Promise<AgentResponseDto> {
    // validate agent credentials (detailed logics for later)
    catchError(() => validateAgentCredentials());

    console.log("calling user register");
    console.log("usecase: recieved request: ", req);
    // add new agent record to the database
    const newUser = await this._authUsecase.registerUserAsync(req.user);
    const newAgent = await this._agentRepo.createPendingAgent(req, newUser.id);

    return new AgentResponseDto(newAgent);
  }

  async approveOrRejectAgentRegistrationAsync(
    agentId: number,
    req: AgentRegistrationApproveRequestDto,
    approvingAdminId: number
  ): Promise<AgentResponseDto> {
    // TODO:
    // check if the approvingadmin has the permission to approve or reject
    // check if the req agent is already approved
    // check others

    try {
      return await this._agentRepo.approveOrRejectAgentRegistration(
        agentId,
        req,
        approvingAdminId
      );
    } catch (error: any) {
      console.error("Caught error:", error);

      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw AppError.new("notFound", "No registration request found.");
      }

      throw AppError.new(
        "internalErrorServer",
        "Something went wrong on the server."
      );
    }
  }
}
