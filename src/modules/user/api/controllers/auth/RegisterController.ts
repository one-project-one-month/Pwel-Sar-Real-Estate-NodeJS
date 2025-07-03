import { NextFunction, Request, Response } from "express";
import { RegisterUseCase } from "modules/user/applications/usecase/auth/register";
import { RegisterRepository } from "modules/user/infrastructures/repositories/auth/RegisterRepository";
import { catchErrorAsync } from "utils/error-handling";


const registerUseCase = new RegisterUseCase(new RegisterRepository());

class RegisterController {
    async create(req: Request, res: Response, next: NextFunction) {
        const [register, error] = await catchErrorAsync(registerUseCase.execute(req.body));
        if (error) return next(error);
        return res.status(201).json({message: "User registered successfully", data: register});
    }
}

const registerController = new RegisterController();
export default registerController;