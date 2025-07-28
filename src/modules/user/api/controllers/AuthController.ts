import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import { LogoutUseCase } from 'modules/user/applications/usecase/auth/LogoutUseCase';
import { RegisterUseCase } from 'modules/user/applications/usecase/auth/RegisterUseCase';
import { uploadToCloudinary } from 'utils/cloudinary';
import { AppError, catchErrorAsync, errorKinds } from 'utils/error-handling';

import { Container } from '../di/Container';
// import { AuthRepository } from 'modules/user/infrastructures/repositories/AuthRepository';
import { LoginUseCase } from './../../applications/usecase/auth/LoginUseCase';
import { RefreshAccessTokenUseCase } from './../../applications/usecase/auth/RefreshAccessTokenUseCase';
export class AuthController {
  async create(req: Request, res: Response, next: NextFunction) {
    console.log(req.files);

    const { email, password, username } = req.body;
    let photoUrl: null | string = null;

    // eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const photoPath = files.photo?.[0].path;

    console.log(req.body);

    try {
      if (photoPath) {
        try {
          photoUrl = await uploadToCloudinary(photoPath);
        } catch (error) {
          console.log(error);
          fs.unlinkSync(photoPath);
        }
      }

      const registerUseCase = new RegisterUseCase(Container.authRepository);
      const [error, result] = await catchErrorAsync(
        registerUseCase.execute({ email, password, photo: photoUrl, username })
      );

      if (error) {
        console.error('Error in registerUseCase:', error);
        next(error);
        return;
      }

      console.log('User created:', result);

      res.status(201).json({ user: result });
    } catch (error) {
      console.log('Error at registeration');
      fs.unlinkSync(photoPath);
      next(error);
    }
  }

  // eslint-disable-next-line no-unused-vars
  async getUser(req: Request, res: Response, next: NextFunction) {
    const user = req.user;

    if (!user) throw AppError.new(errorKinds.notAuthorized, 'Unauthorized');

    res.status(200).json(user);
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

    if (!id) throw AppError.new('invalidToken', 'No userId');

    await logoutUseCase.execute(id);

    res.status(204).json({ message: 'Logout success' });
  }

  // eslint-disable-next-line no-unused-vars
  async refreshToken(req: Request, res: Response, next: NextFunction) {
    const { refreshToken } = req.body;

    console.log(refreshToken);

    if (!refreshToken)
      throw AppError.new(errorKinds.notFound, 'Token is not found');

    const refreshAccessTokenUseCase = new RefreshAccessTokenUseCase(
      Container.authRepository
    );

    const newAccessToken = await refreshAccessTokenUseCase.execute(
      refreshToken
    );
    res.status(200).json(newAccessToken);
  }
}
