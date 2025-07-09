import { NextFunction, Request, Response } from 'express';
import { LogoutUseCase } from 'modules/user/applications/usecase/auth/LogoutUseCase';
import { RegisterUseCase } from 'modules/user/applications/usecase/auth/RegisterUseCase';
import { AuthRepository } from 'modules/user/infrastructures/repositories/AuthRepository';
import { AppError, catchErrorAsync, errorKinds } from 'utils/error-handling';

import { LoginUseCase } from './../../applications/usecase/auth/LoginUseCase';

export class AuthController {
  async create(req: Request, res: Response, next: NextFunction) {
    const { email, password, username } = req.body;

    console.log(req.body);

    const registerUseCase = new RegisterUseCase(new AuthRepository());
    const [result, error] = await catchErrorAsync(
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

  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    console.log('Login', req.body);
    const loginUseCase = new LoginUseCase(new AuthRepository());

    // const [result, error] = await catchErrorAsync(
    // 	loginUseCase.execute({ email, password })
    // );
    // console.log(result);

    // if (error) {
    // 	next(error);
    // 	return;
    // }

    const result = await loginUseCase.execute({ email, password });

    if (!result)
      return next(AppError.new(errorKinds.badRequest, 'Login failed'));

    res.status(200).json(result);
  }

  // eslint-disable-next-line no-unused-vars
  async logout(req: Request, res: Response, next: NextFunction) {
    const { refreshToken } = req.body;

    const logoutUseCase = new LogoutUseCase(new AuthRepository());

    if (!refreshToken)
      throw AppError.new('invalidToken', 'Invalid RefreshToken');

    await logoutUseCase.execute(refreshToken);

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
