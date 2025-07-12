import { NextFunction, Request, Response } from 'express';
import { RequestPasswordResetTokenUseCase } from 'modules/user/applications/usecase/passwordResetToken/RequestPasswordResetTokenUseCase';
import { catchErrorAsync } from 'utils/error-handling';

import { Container } from '../di/Container';

export class PasswordResetController {
  async requestPasswordResetToken(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { email } = req.body;

    const requestPasswordResetTokenUseCase =
      new RequestPasswordResetTokenUseCase(
        Container.authRepository,
        Container.passwordResetRepository
      );

    const [error, result] = await catchErrorAsync(
      requestPasswordResetTokenUseCase.execute(email)
    );

    if (error) {
      next(error);
      return;
    }

    res.status(201).json({ token: result });
  }
}
