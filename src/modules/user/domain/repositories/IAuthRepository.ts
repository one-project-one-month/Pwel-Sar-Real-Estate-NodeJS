/* eslint-disable no-unused-vars */
import { Token } from '../entitiies/Token.entity';
import { User } from '../entitiies/User.entity';

export interface IAuthRepository {
  create(data: any): Promise<User>;
  createRefreshToken({
    refreshToken,
    userId,
  }: {
    refreshToken: string;
    userId: number;
    // expiresAt: Date;
  }): Promise<Token>;
  deleteToken(refreshToken: string): Promise<void>;
  findByEmail(email: string): Promise<null | User>;
  findById(id: number): Promise<null | User>;
  findToken(userId: number): Promise<null | Token>;
}
