import { PasswordResetToken } from '../entitiies/PasswordResetToken';

/* eslint-disable no-unused-vars */
export interface IPasswordResetRepository {
  createPasswordResetToken(data: {
    token: string;
    userId: number;
  }): Promise<PasswordResetToken>;
  findTokenByUserId(id: number): Promise<null | PasswordResetToken>;
}
