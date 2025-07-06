import { Router } from "express";
import { container } from "tsyringe";
import AgentController from "modules/agent/agent.controller";

const agentRouter = Router();
const agentController = container.resolve(AgentController);

agentRouter.post(
  "/register",
  agentController.registerAgentAsync.bind(agentController)
);

agentRouter.patch(
  "/approve-or-reject",
  agentController.approveOrRejectAgentRegistration.bind(agentController)
);

export default agentRouter;
