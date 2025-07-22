export class TokenDTO {
  createdAt: Date;
  expiresAt: Date;
  id: Number;
  refreshToken: string;
  updatedAt: Date;
  userId: Number;

  constructor(token: any) {
    this.id = token.id;
    this.refreshToken = token.refreshToken;
    this.userId = token.userId;
    this.expiresAt = token.expiresAt;
    this.createdAt = token.createdAt;
    this.updatedAt = token.updatedAt;
  }
}
