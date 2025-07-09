import { AppError } from "utils/error-handling";

export class Rating {
  constructor(
    public readonly point: number, // e.g. from 1 to 5
    public readonly userId: number,
    public readonly agentId: number,
    public readonly createdAt: Date
  ) {}

  isValidPoint(): boolean {
    if (this.point < 1 || this.point > 5) {
     return false;
    } 
    if (typeof this.point !== "number") {
      return false;
    }
    return true;
  }

  isValidRatingProcess(): boolean {
    if(this.userId === this.agentId) {
     return false;
    } else {
      return true;
    }
  }
}