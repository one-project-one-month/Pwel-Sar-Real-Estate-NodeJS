export class Token {
  id: number;
  refreshToken: string;
  userId: number;
  //   expiresAt: Date;
  //   createdAt: Date;
  //   updatedAt: Date;

  constructor(
    id: number,
    refreshToken: string,
    userId: number
    // expiresAt: Date,
    // createdAt: Date,
    // updatedAt: Date
  ) {
    this.id = id;
    this.refreshToken = refreshToken;
    this.userId = userId;
    // this.expiresAt = expiresAt;
    // this.createdAt = createdAt;
    // this.updatedAt = updatedAt;
  }
}
