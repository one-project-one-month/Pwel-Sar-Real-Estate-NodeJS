import { Router } from 'express';
import validationMiddleware from 'middlewares/validationMiddleware';
import { PasswordResetController } from 'modules/user/api/controllers/PasswordResetController';
import {
  PasswordResetSchema,
  RequestPasswordResetTokenSchema,
} from 'modules/user/api/middlewares/passwordResetValidation';

const passwordResetController = new PasswordResetController();

const passwordResetRouter = Router();

passwordResetRouter.post(
  '/',
  validationMiddleware.validateRequestBody(RequestPasswordResetTokenSchema),
  passwordResetController.requestPasswordResetToken
);

passwordResetRouter.patch(
  '/',
  validationMiddleware.validateRequestBody(PasswordResetSchema),
  passwordResetController.passwordReset
);

export default passwordResetRouter;
