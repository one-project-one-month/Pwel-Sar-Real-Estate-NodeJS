import { Request, Response, NextFunction } from "express";
import { RegisterUseCase } from "modules/user/applications/usecase/auth/register";
import { RegisterRepository } from "modules/user/infrastructures/repositories/auth/RegisterRepository";
import { AppError, catchErrorAsync } from "utils/error-handling";

class RegisterController {
  async create(req: Request, res: Response, next: NextFunction) {
    const { username, email, password } = req.body;
    
    const registerUseCase = new RegisterUseCase(new RegisterRepository());
    const [result, error] = await catchErrorAsync(registerUseCase.execute({ username, email, password }));
    if (error) return next(error);
    
    return res.status(201).json({
      user: result,
    });
  }
}

export const registerController = new RegisterController();
export default registerController;