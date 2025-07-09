import { Router } from 'express';
import validationMiddleware from 'middlewares/validationMiddleware';
import { AuthController } from 'modules/user/api/controllers/AuthController';
import {
  LoginSchema,
  RegisterSchema,
} from 'modules/user/api/middlewares/authValidation';
import passport from 'passport';

const authController = new AuthController();

const authRouter = Router();

authRouter.post(
  '/register',
  validationMiddleware.validateRequestBody(RegisterSchema),
  authController.create
);

authRouter.post(
  '/login',
  validationMiddleware.validateRequestBody(LoginSchema),
  passport.authenticate('local', { session: false }),
  authController.login
);

// authRouter.get('get-user', passport.authenticate('access-jwt'), (req, res) => {
//     user =
// });

export default authRouter;
