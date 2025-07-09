export class Rating {
  constructor(
    // eslint-disable-next-line no-unused-vars
    public readonly point: number, // e.g. from 1 to 5
    // eslint-disable-next-line no-unused-vars
    public readonly userId: number,
    // eslint-disable-next-line no-unused-vars
    public readonly agentId: number,
    // eslint-disable-next-line no-unused-vars
    public readonly createdAt: Date
  ) {}

  isValidPoint(): boolean {
    if (this.point < 1 || this.point > 5) {
      return false;
    }
    if (typeof this.point !== 'number') {
      return false;
    }
    return true;
  }

  isValidRatingProcess(): boolean {
    if (this.userId === this.agentId) {
      return false;
    } else {
      return true;
    }
  }
}
