import { NextFunction, Request, Response } from 'express';
import { LogoutUseCase } from 'modules/user/applications/usecase/auth/LogoutUseCase';
import { RegisterUseCase } from 'modules/user/applications/usecase/auth/RegisterUseCase';
import { AppError, catchErrorAsync, errorKinds } from 'utils/error-handling';

// import { AuthRepository } from 'modules/user/infrastructures/repositories/AuthRepository';
import { LoginUseCase } from './../../applications/usecase/auth/LoginUseCase';

import { Container } from '../di/Container';
export class AuthController {
  async create(req: Request, res: Response, next: NextFunction) {
    const { email, password, username } = req.body;

    console.log(req.body);

    const registerUseCase = new RegisterUseCase(Container.authRepository);
    const [error, result] = await catchErrorAsync(
      registerUseCase.execute({ email, password, username })
    );

    console.log(result);

    if (error) {
      next(error);
      return;
    }

    res.status(201).json({
      user: result,
    });
  }

  async getUser(req: Request, res: Response, next: NextFunction) {
    if (!req.user) throw new Error('User not authenticated');

    // const user =
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    console.log('Login', req.body);
    const loginUseCase = new LoginUseCase(Container.authRepository);

    const [error, result] = await catchErrorAsync(
      loginUseCase.execute({ email, password })
    );
    console.log(result);

    if (error) {
      next(error);
      return;
    }

    // const result = await loginUseCase.execute({ email, password });

    if (!result)
      return next(AppError.new(errorKinds.badRequest, 'Login failed'));

    res.status(200).json(result);
  }

  // eslint-disable-next-line no-unused-vars
  async logout(req: Request, res: Response, next: NextFunction) {
    const { id }: { id: number } = req.user as { id: number };

    const logoutUseCase = new LogoutUseCase(Container.authRepository);

    if (!id) throw AppError.new('invalidToken', 'Invalid RefreshToken');

    await logoutUseCase.execute(id);

    res.status(204).send();
  }

  // async refreshToken(req: Request, res: Response, next: NextFunction) {
  // 	try {
  // 		const { refreshToken } = req.body;
  // 		const newTokens = await this.authRepository.refreshToken(
  // 			refreshToken
  // 		);
  // 		res.status(200).json(newTokens);
  // 	} catch (error) {
  // 		next(error);
  // 	}
  // }
}
