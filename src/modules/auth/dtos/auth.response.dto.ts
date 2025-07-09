export class TokenResponseDto {
  id: Number;
  refreshToken: string;
  userId: Number;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;

  constructor(token: any) {
    this.id = token.id;
    this.refreshToken = token.refreshToken;
    this.userId = token.userId;
    this.expiresAt = token.expiresAt;
    this.createdAt = token.createdAt;
    this.updatedAt = token.updatedAt;
  }
}
