import { Request, Response, NextFunction } from "express";
import { AppError, catchErrorAsync } from "utils/error-handling";
import { AuthRepository } from "modules/user/infrastructures/repositories/auth/AuthRepository";
import { LoginUseCase } from "modules/user/applications/usecase/auth/login";
import { RegisterUseCase } from "modules/user/applications/usecase/auth/register";
import { RegisterRepository } from "modules/user/infrastructures/repositories/auth/RegisterRepository";
import { LoginDTO } from "modules/user/applications/dtos/auth/LoginDTO";

export class AuthController {
	async login(req: Request, res: Response, next: NextFunction) {
		const { email, password } = req.body;
		const loginUseCase = new LoginUseCase(new AuthRepository());
		const dto = new LoginDTO(email, password);
		const [result, error] = await catchErrorAsync(
			loginUseCase.execute(dto)
		);
		if (error) return next(error);
		return res.status(200).json(result);
	}

	async create(req: Request, res: Response, next: NextFunction) {
		const { username, email, password } = req.body;

		const registerUseCase = new RegisterUseCase(new RegisterRepository());
		const [result, error] = await catchErrorAsync(
			registerUseCase.execute({ username, email, password })
		);
		if (error) return next(error);

		return res.status(201).json({
			user: result,
		});
	}
}
