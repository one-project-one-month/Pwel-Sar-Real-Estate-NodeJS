import { NextFunction, Request, Response } from 'express';
import { PasswordResetUseCase } from 'modules/user/applications/usecase/passwordResetToken/PasswordResetUseCase';
import { RequestPasswordResetTokenUseCase } from 'modules/user/applications/usecase/passwordResetToken/RequestPasswordResetTokenUseCase';
import { catchErrorAsync } from 'utils/error-handling';

import { Container } from '../di/Container';

export class PasswordResetController {
  async passwordReset(req: Request, res: Response, next: NextFunction) {
    const { email, newPassword, token } = req.body;

    const passwordResetUseCase = new PasswordResetUseCase(
      Container.authRepository,
      Container.passwordResetRepository
    );

    const [error, result] = await catchErrorAsync(
      passwordResetUseCase.execute(email, newPassword, token)
    );

    if (error) {
      next(error);
      return;
    }

    res.status(200).json({ data: result });
  }

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

    //TODO: send otp via email and response just success message

    // res.status(201).json({ message: 'OTP sent successfully' });
    res.status(201).json({ token: result });
  }
}
