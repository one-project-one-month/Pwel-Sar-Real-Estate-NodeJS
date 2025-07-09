import { Router } from 'express';
import passport from 'passport';
import validationMiddleware from 'middlewares/validationMiddleware';
import {
  LoginSchema,
  RegisterSchema,
} from 'modules/auth/validations/authValidation';
import { container } from 'tsyringe';
import AuthController from 'modules/auth/auth.controller';

const authRouter = Router();
const authController = container.resolve(AuthController);

authRouter.post(
  '/register',
  validationMiddleware.validateRequestBody(RegisterSchema),
  authController.registerUserAsync.bind(authController)
);

authRouter.post(
  '/login',
  validationMiddleware.validateRequestBody(LoginSchema),
  passport.authenticate('local', { session: false }),
  authController.login.bind(authController)
);

export default authRouter;
