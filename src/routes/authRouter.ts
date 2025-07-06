import { Router } from "express";
import { container } from "tsyringe";
import AuthController from "modules/auth/auth.controller";

const authRouter = Router();
const authController = container.resolve(AuthController);

authRouter.post(
  "/register",
  authController.registerUserAsync.bind(authController)
);

export default authRouter;
