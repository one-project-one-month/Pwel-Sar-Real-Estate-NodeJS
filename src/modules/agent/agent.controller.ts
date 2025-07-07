import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { catchErrorAsync } from "utils/error-handling";
import { IAgentUseCase } from "./interfaces/agent.usecase.interface";
import { Jwt } from "jsonwebtoken";
import { getUserIdByJwtToken } from "helpers/cookies.helper";

@injectable()
export default class AgentController {
  constructor(
    @inject("IAgentUseCase") private readonly _agentUseCase: IAgentUseCase
  ) {}

  async registerAgentAsync(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    console.log(req.body);
    const [error, pendingAgent] = await catchErrorAsync(
      this._agentUseCase.registerAgentAsync(req.body)
    );
    if (error) return next(error);
    return res.status(200).json(pendingAgent);
  }

  async approveOrRejectAgentRegistration(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    console.log("ctrl: req:", req.body);
    // get via token (for later)
    const accessToken: Jwt = req.cookies["access_token"];
    const approvingAdminId: number = accessToken
      ? getUserIdByJwtToken(accessToken)
      : 39;
    const { id } = req.params;
    const agentId = parseInt(id, 10);

    const [error, modifiedAgent] = await catchErrorAsync(
      this._agentUseCase.approveOrRejectAgentRegistrationAsync(
        agentId,
        req.body,
        approvingAdminId
      )
    );
    if (error) return next(error);
    return res.status(200).json(modifiedAgent);
  }
}
