import { Router } from "express";
import { container } from "tsyringe";
import AgentController from "modules/agent/agent.controller";
import { CreateRatingUseCase } from "modules/agent/applications/usecase/CreateRatingUseCase";
import { RatingRepository } from "modules/agent/infrastructures/RatingRepository";
import { AppError } from "utils/error-handling";
import ratingController from "modules/agent/api/controller/RatingController";
import validationMiddlewate from "middlewares/validationMiddlewate";
import { createRatingReqBodySchema } from "modules/agent/api/body/createRatingSchema";

const agentRouter = Router();
const agentController = container.resolve(AgentController);

const createRatingUseCase = new CreateRatingUseCase(new RatingRepository())

agentRouter.post(
  "/register",
  agentController.registerAgentAsync.bind(agentController)
);

agentRouter.patch(
  "/:id/approve-or-reject",
  agentController.approveOrRejectAgentRegistration.bind(agentController)
);

agentRouter.post(
  "/ratings/create", 
  validationMiddlewate.validateRequestBody(createRatingReqBodySchema),
  ratingController.create
);

export default agentRouter;
