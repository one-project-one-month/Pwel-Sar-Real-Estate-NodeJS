import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "tsyringe";
import { IAuthUseCase } from "./interfaces/auth.usecase.interface";
import { catchErrorAsync } from "utils/error-handling";

@injectable()
export default class AuthController {
  constructor(
    @inject("IAuthUseCase") private readonly _authUseCase: IAuthUseCase
  ) {}

  async registerAgentAsync(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const [pendingAgent, error] = await catchErrorAsync(
      this._authUseCase.registerAgentAsync(req.body)
    );
    if (error) return next(error);
    return res.status(200).json(pendingAgent);
  }

  async registerUserAsync(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const [newUser, error] = await catchErrorAsync(
      this._authUseCase.registerUserAsync(req.body)
    );
    if (error) return next(error);
    return res.status(200).json(newUser);
  }
}
