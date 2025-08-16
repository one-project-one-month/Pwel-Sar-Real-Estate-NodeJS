import { Router } from 'express';
import { AgentController } from 'modules/user/api/controllers/AgentController';
import passport from 'passport';
// import { createRatingReqBodySchema } from 'modules/agent/api/body/createRatingSchema';
// import ratingController from 'modules/agent/api/controller/RatingController';
// import { container } from 'tsyringe';

const agentController = new AgentController();

const agentRouter = Router();
// const agentController = container.resolve(AgentController);

// agentRouter.post(
//   '/register',
//   agentController.registerAgentAsync.bind(agentController)
// );

// agentRouter.patch(
//   '/:id/approve-or-reject',
//   agentController.approveOrRejectAgentRegistration.bind(agentController)
// );

// agentRouter.post(
//   '/ratings/create',
//   validationMiddlewate.validateRequestBody(createRatingReqBodySchema),
//   ratingController.create
// );

agentRouter.post(
  '/create',
  //   validationMiddlewate.validateRequestBody(AgentSchema),
  passport.authenticate('access-jwt', { session: false }),
  agentController.createPendingAgent
);

agentRouter.patch(
  '/:id/verify',
  //   validationMiddlewate.validateRequestBody(AgentSchema),
  passport.authenticate('access-jwt', { session: false }),
  agentController.verifyAgent
);

export default agentRouter;
