import { NextFunction, Request, Response } from 'express';
import { CreartePendingAgentUseCase } from 'modules/user/applications/usecase/agent/CreatePendingAgentUseCase';
import { VerifyAgentUseCase } from 'modules/user/applications/usecase/VerifyAgentUseCase';
import { AppError } from 'utils/error-handling';

import { Container } from '../di/Container';

export class AgentController {
  // eslint-disable-next-line no-unused-vars
  async createPendingAgent(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body);
      console.log(req.user);
      const { address, licenseNumber, nrcNumber, phone } = req.body;
      const user = req.user as any;

      if (!user) {
        throw AppError.new('notAuthorized', 'Unauthorized');
      }

      const userId = user.id;

      const createPenfondingAgentUseCase = new CreartePendingAgentUseCase(
        Container.agentRepository
      );

      const agent = await createPenfondingAgentUseCase.execute({
        address,
        licenseNumber,
        nrcNumber,
        phone,
        userId,
      });
      res.status(201).json({
        message: 'Pending agent created successfully',
        payload: agent,
      });
    } catch (error) {
      throw AppError.new(
        'internalErrorServer',
        `Something went wrong: ${error}`
      );
    }
  }

  // eslint-disable-next-line no-unused-vars
  async verifyAgent(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const user = req.user as { id: number };

      const agentId = Number(id);

      //   console.log(req.params);
      //   console.log(req.body);
      //   console.log(req.user);

      if (!user) {
        throw AppError.new('notAuthorized', 'Unauthorized');
      }

      const approvedById = Number(user.id);
      console.log(user.id);

      const verifyAgentUseCase = new VerifyAgentUseCase(
        Container.agentRepository
      );

      const agent = await verifyAgentUseCase.execute({
        agentId,
        approvedById,
        status,
      });

      res.status(200).json(agent);
    } catch (error) {
      throw AppError.new(
        'internalErrorServer',
        `Something went wrong: ${error}`
      );
    }
  }
}
