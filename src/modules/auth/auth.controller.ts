import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'tsyringe';
import { IAuthUsecase } from './interfaces/auth.usecase.interface';
import { AppError, catchErrorAsync } from 'utils/error-handling';
import {
  UserLoginRequestDto,
  UserRegistrationRequestDto,
} from './dtos/auth.request.dto';

@injectable()
export default class AuthController {
  constructor(
    @inject('IAuthUsecase') private readonly _authUseCase: IAuthUsecase
  ) {}

  async registerUserAsync(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const request: UserRegistrationRequestDto = req.body;

    const [error, newUser] = await catchErrorAsync(
      this._authUseCase.registerUserAsync(request)
    );
    if (error) return next(error);
    return res.status(200).json(newUser);
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const request: UserLoginRequestDto = req.body;
    console.log('Login', req.body);

    const [error, result] = await catchErrorAsync(
      this._authUseCase.loginUserAsync(request)
    );

    if (error) {
      return next(error);
    }

    res.status(200).json(result);
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    const { refreshToken } = req.body;

    if (!refreshToken)
      throw AppError.new('invalidToken', 'Invalid RefreshToken');

    await this._authUseCase.logoutUserAsync();

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
