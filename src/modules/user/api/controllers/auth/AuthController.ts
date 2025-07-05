import { Request, Response, NextFunction } from "express";
import { AppError, catchErrorAsync } from "utils/error-handling";
import { UserRepository } from "modules/user/infrastructures/repositories/UserRepository";
import { LoginUseCase } from "modules/user/applications/usecase/auth/login";
import { RegisterUseCase } from "modules/user/applications/usecase/auth/register";
import { AuthRepository } from "modules/user/infrastructures/repositories/auth/AuthRepository";

export class AuthController {

	async create(req: Request, res: Response, next: NextFunction) {
		const { username, email, password } = req.body;
		
		const registerUseCase = new RegisterUseCase(new AuthRepository());
		const [result, error] = await catchErrorAsync(registerUseCase.execute({ username, email, password }));
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
		const [result, error] = await catchErrorAsync(
			loginUseCase.execute({ email, password })
		);
		if (error) return next(error);
		if (
			!result ||
			typeof result !== "object" ||
			!("user" in result) ||
			!("token" in result)
		) {
			return next(AppError.new("internalErrorServer", "Login failed"));
		}
		const user = (result as any).user;
		const token = (result as any).token;
		return res.status(200).json({
			user: {
				id: user.id,
				username: user.username,
				email: user.email,
				roleId: user.roleId,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
			},
			token,
		});
	}
}

export const authController = new AuthController();
export default authController;