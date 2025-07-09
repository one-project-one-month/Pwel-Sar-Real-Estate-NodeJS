import { Token } from 'entities/token.entity';
import { Permission, User } from '../../../entities/index';
import { UserRegistrationRequestDto } from '../dtos/auth.request.dto';

export interface IAuthRepository {
  registerUserAsync(req: UserRegistrationRequestDto): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  createRefreshToken({
    refreshToken,
    userId,
    expiresAt,
  }: {
    refreshToken: string;
    userId: number;
    expiresAt: Date;
  }): Promise<void>;
  findToken(userId: number): Promise<Token | null>;
  deleteToken(refreshToken: string): Promise<void>;
  getAllPermissionsAsync(): Promise<Permission[]>;
  getPermissionByRoleId(roleID: number): Promise<Permission[]>;
}
