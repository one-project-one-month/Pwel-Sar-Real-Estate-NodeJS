/* eslint-disable no-unused-vars */
import { Rating } from '../entities/RatingEntity';

export interface IRatingRepository {
  create(rating: Rating): Promise<void>;
}
