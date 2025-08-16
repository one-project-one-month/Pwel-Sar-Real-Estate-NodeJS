/* eslint-disable no-unused-vars */
import { Token } from '../entities/Token.entity';
import { User } from '../entities/User.entity';

export interface IAuthRepository {
  create(data: any): Promise<User>;
  createRefreshToken({
    refreshToken,
    userId,
  }: {
    refreshToken: string;
    userId: number;
    // expiresAt: Date;
  }): Promise<void>;
  deleteToken(userId: number): Promise<Token>;
  findByEmail(email: string): Promise<null | User>;
  findById(id: number): Promise<null | User>;
  findToken(refreshToken: string): Promise<null | Token>;
}
