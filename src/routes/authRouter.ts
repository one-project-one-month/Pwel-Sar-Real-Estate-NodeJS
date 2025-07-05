import { Router } from "express";
import authController from "modules/user/api/controllers/auth/AuthController";
import { validate } from "modules/user/api/middlewares/validate";
import { RegisterSchema } from "utils/auth/AuthValidation";

const authRouter = Router();

authRouter.post("/register", validate(RegisterSchema), authController.create);

export default authRouter;
