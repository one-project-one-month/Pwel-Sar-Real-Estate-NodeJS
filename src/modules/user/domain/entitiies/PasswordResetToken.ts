export class PasswordResetToken {
  createdAt: Date;
  expiresAt: Date;
  id: number;
  token: string;
  userId: number;

  constructor(
    id: number,
    token: string,
    expiresAt: Date,
    userId: number,
    createdAt: Date
  ) {
    this.id = id;
    this.token = token;
    this.expiresAt = expiresAt;
    this.userId = userId;
    this.createdAt = createdAt;
  }
  isExpired(): boolean {
    return this.expiresAt < new Date();
  }
}
