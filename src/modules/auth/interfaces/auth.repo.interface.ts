import { User } from "../../../entities/index";
import { UserRegistrationRequestDto } from "../dtos/auth.request.dto";

export interface IAuthRepository {
  registerUserAsync(req: UserRegistrationRequestDto): Promise<User>;
}
