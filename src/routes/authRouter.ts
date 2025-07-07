import { Router } from "express";
import passport from "passport";

import { AuthController } from "modules/user/api/controllers/AuthController";

import validationMiddleware from "middlewares/validationMiddlewate";
import {
	LoginSchema,
	RegisterSchema,
} from "modules/user/api/middlewares/authValidation";

import { AppError, errorKinds } from "utils/error-handling";

// import { validate } from "modules/user/api/middlewares/validate";

const authController = new AuthController();

const authRouter = Router();

authRouter.post(
	"/register",
	validationMiddleware.validateRequestBody(RegisterSchema),
	authController.create
);

authRouter.post(
	"/login",
	validationMiddleware.validateRequestBody(LoginSchema),
	passport.authenticate("local", { session: false }),
	authController.login
);

export default authRouter;
