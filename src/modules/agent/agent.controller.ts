import { NextFunction, Request, Response } from 'express';
import { getUserIdByJwtToken } from 'helpers/cookies.helper';
import { Jwt } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { catchErrorAsync } from 'utils/error-handling';

import { IAgentUseCase } from './interfaces/agent.usecase.interface';

@injectable()
export default class AgentController {
  constructor(
    @inject('IAgentUseCase') private readonly _agentUseCase: IAgentUseCase
  ) {}

  async approveOrRejectAgentRegistration(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    console.log('ctrl: req:', req.body);
    // get via token (for later)
    const accessToken: Jwt = req.cookies.access_token;
    const approvingAdminId: number = accessToken
      ? getUserIdByJwtToken(accessToken)
      : 1;
    const { id } = req.params;
    const agentId = parseInt(id, 10);

    const [error, modifiedAgent] = await catchErrorAsync(
      this._agentUseCase.approveOrRejectAgentRegistrationAsync(
        agentId,
        req.body,
        approvingAdminId
      )
    );
    if (error) {
      next(error);
      return;
    }
    return res.status(200).json(modifiedAgent);
  }

  async registerAgent(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    console.log(req.body);
    const [error, pendingAgent] = await catchErrorAsync(
      this._agentUseCase.registerAgentAsync(req.body)
    );
    if (error) {
      next(error);
      return;
    }
    return res.status(200).json(pendingAgent);
  }

  async rateAgent(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const { id } = req.params;
    const agentId = parseInt(id, 10);

    // not yet implemented really
    const token: Jwt = req.cookies['access_token'];
    const ratingUserId = getUserIdByJwtToken(token);

    const [error, _] = await catchErrorAsync(
      this._agentUseCase.rateAgentAsync({
        agentId: agentId,
        point: req.body.point,
        userId: ratingUserId,
      })
    );

    if (error) {
      return next(error);
    }

    return res.sendStatus(200);
  }
}
