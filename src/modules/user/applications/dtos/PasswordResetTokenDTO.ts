import { PasswordResetToken } from 'modules/user/domain/entitiies/PasswordResetToken';

export class PasswordResetTokenDTO {
  createdAt: Date;
  expiresAt: Date;
  id: number;
  token: string;
  userId: number;

  constructor(token: PasswordResetToken) {
    this.id = token.id;
    this.token = token.token;
    this.expiresAt = token.expiresAt;
    this.userId = token.userId;
    this.createdAt = token.createdAt;
  }
}
