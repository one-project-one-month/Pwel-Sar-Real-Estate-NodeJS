import { Router } from 'express';
import validationMiddlewate from 'middlewares/validationMiddleware';
import AgentController from 'modules/agent/agent.controller';
import { createRatingReqBodySchema } from 'modules/agent/api/body/createRatingSchema';
import ratingController from 'modules/agent/api/controller/RatingController';
import { container } from 'tsyringe';

const agentRouter = Router();
const agentController = container.resolve(AgentController);

agentRouter.post(
  '/register',
  agentController.registerAgentAsync.bind(agentController)
);

agentRouter.patch(
  '/:id/approve-or-reject',
  agentController.approveOrRejectAgentRegistration.bind(agentController)
);

agentRouter.post(
  '/ratings/create',
  validationMiddlewate.validateRequestBody(createRatingReqBodySchema),
  ratingController.create
);

export default agentRouter;
