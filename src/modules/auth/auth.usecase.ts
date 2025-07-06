import { inject, injectable } from "tsyringe";
import { IAuthUseCase } from "./interfaces/auth.usecase.interface";
import { UserRegistrationRequestDto } from "./dtos/auth.request.dto";
import { IAuthRepository } from "./interfaces/auth.repo.interface";
import { AppError } from "utils/error-handling";
import { UserDTO } from "modules/user/applications/dtos/UserDTO";

@injectable()
export default class AuthUseCase implements IAuthUseCase {
  constructor(
    @inject("IAuthRepository") private readonly _authRepo: IAuthRepository
  ) {}

  async registerUserAsync(req: UserRegistrationRequestDto): Promise<UserDTO> {
    try {
      return await this._authRepo.registerUserAsync(req);
    } catch (err: any) {
      if (err.code === "P2002") {
        throw AppError.new("alreadyExist", "User already exists.");
      }

      throw AppError.new(
        "internalErrorServer",
        "Something went wrong on the server."
      );
    }
  }
}
