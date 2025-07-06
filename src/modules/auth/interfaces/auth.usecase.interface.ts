import { UserRegistrationRequestDto } from "../dtos/auth.request.dto";
import { UserDTO } from "modules/user/applications/dtos/UserDTO";

export interface IAuthUseCase {
  registerUserAsync(req: UserRegistrationRequestDto): Promise<UserDTO>;
}
