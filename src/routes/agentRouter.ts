import { Router } from 'express';
import validationMiddleware from 'middlewares/validationMiddlewate';
import AgentController from 'modules/agent/agent.controller';
import { createRatingReqBodySchema } from 'modules/agent/validations/createRatingSchema';
import { container } from 'tsyringe';

const agentRouter = Router();
const agentController = container.resolve(AgentController);

agentRouter.post(
  '/register',
  agentController.registerAgent.bind(agentController)
);

agentRouter.patch(
  '/:id/approve-or-reject',
  agentController.approveOrRejectAgentRegistration.bind(agentController)
);

agentRouter.post(
  '/:id/rate',
  validationMiddleware.validateRequestBody(createRatingReqBodySchema),
  agentController.rateAgent.bind(agentController)
);

export default agentRouter;
