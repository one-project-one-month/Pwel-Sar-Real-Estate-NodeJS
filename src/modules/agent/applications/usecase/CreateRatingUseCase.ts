import { Rating } from "modules/agent/domain/entities/RatingEntity";
import { IRatingRepository } from "modules/agent/domain/repositories/IRatingRepository";
import { AppError } from "utils/error-handling";

type  RatingPayload = { point: number, userId: number, agentId: number };
export class CreateRatingUseCase {
    constructor(private readonly ratingRepository: IRatingRepository) {}

    async execute(rating: RatingPayload): Promise<void> {
        try {
            const newRating = new Rating(rating.point, rating.userId, rating.agentId, new Date());
            if(!newRating.isValidPoint()) throw AppError.new('badRequest', "Invalid rating point.");
            await this.ratingRepository.create(newRating);
        } catch (error) {
            if(error instanceof Error) throw error;
            throw AppError.new('internalErrorServer', "Something went wrong on the server.");
        }
    }
}