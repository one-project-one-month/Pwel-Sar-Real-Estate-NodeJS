import { Request, Response, NextFunction } from "express";
import { AppError, catchErrorAsync } from "utils/error-handling";
import { UserRepository } from "modules/user/infrastructures/repositories/UserRepository";
import { LoginUseCase } from "modules/user/applications/usecase/auth/LoginUseCase";
import { RegisterUseCase } from "modules/user/applications/usecase/auth/RegisterUseCase";
import { AuthRepository } from "modules/user/infrastructures/repositories/auth/AuthRepository";

export class AuthController {
	async create(req: Request, res: Response, next: NextFunction) {
		const { username, email, password } = req.body;

		const registerUseCase = new RegisterUseCase(new AuthRepository());
		const [result, error] = await catchErrorAsync(
			registerUseCase.execute({ username, email, password })
		);

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
		const loginUseCase = new LoginUseCase(new UserRepository());
		
		const [error,result] = await catchErrorAsync(
			loginUseCase.execute({ email, password })
		);
		
		if (error) {
			next(error);
			return;
		};

		const user = (result as any).user;
		const accessToken = (result as any).accessToken;
		const refreshToken = (result as any).refreshToken;

		res.status(200).json({
			user: {
				id: user.id,
				username: user.username,
				email: user.email,
				roleId: user.roleId,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
			},
				accessToken,
				refreshToken,
		});
	}
}

export const authController = new AuthController();
export default authController;
