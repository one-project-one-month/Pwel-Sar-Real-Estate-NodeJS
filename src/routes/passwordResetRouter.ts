import { Router } from 'express';
import validationMiddleware from 'middlewares/validationMiddleware';
import { PasswordResetController } from 'modules/user/api/controllers/PasswordResetController';
import { RequestPasswordResetTokenSchema } from 'modules/user/api/middlewares/passwordResetValidation';

const passwordResetController = new PasswordResetController();

const passwordResetRouter = Router();

passwordResetRouter.post(
  '/',
  validationMiddleware.validateRequestBody(RequestPasswordResetTokenSchema),
  passwordResetController.requestPasswordResetToken
);

export default passwordResetRouter;
