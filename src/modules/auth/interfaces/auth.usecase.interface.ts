import { UserResponseDto } from 'modules/user/dtos/user.response.dto';
import {
  UserLoginRequestDto,
  UserRegistrationRequestDto,
} from '../dtos/auth.request.dto';

export interface IAuthUsecase {
  registerUserAsync(req: UserRegistrationRequestDto): Promise<UserResponseDto>;
  checkRolePermission(params: any): Promise<any>;
  loginUserAsync(req: UserLoginRequestDto): Promise<UserResponseDto>;
  logoutUserAsync(): Promise<UserResponseDto>;
}
