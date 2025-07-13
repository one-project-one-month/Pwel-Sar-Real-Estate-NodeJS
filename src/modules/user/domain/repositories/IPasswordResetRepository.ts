import { PasswordResetToken } from '../entitiies/PasswordResetToken';
import { User } from '../entitiies/User.entity';

/* eslint-disable no-unused-vars */
export interface IPasswordResetRepository {
  createPasswordResetToken(data: {
    token: string;
    userId: number;
  }): Promise<PasswordResetToken>;
  deleteTokenByUserId(id: number): Promise<void>;
  findTokenByUserId(id: number): Promise<null | PasswordResetToken>;
  passwordReset(data: { newPassword: string; userId: number }): Promise<User>;
}
