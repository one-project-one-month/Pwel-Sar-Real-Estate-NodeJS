import { prisma } from "libs/prismaClients";
import { IRatingRepository } from "../domain/repositories/IRatingRepository";
import { AppError, catchErrorAsync } from "utils/error-handling";
import { Rating } from "../domain/entities/RatingEntity";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { error } from "console";

export class RatingRepository implements IRatingRepository {
    async create(rating: Rating): Promise<void> {
        const [errors, newRating] = await catchErrorAsync(prisma.rating.create({
            data: {
                point: rating.point,
                agentId: rating.agentId,
                userId: rating.userId
            }
        }));
        
        if(errors) {
            switch((errors as PrismaClientKnownRequestError).code) {
                case 'P2002':
                    throw AppError.new('alreadyExist', 'Rating already exists.');
                case 'P2003':
                    throw AppError.new('notFound', 'User or agent not found.');
                default:
                    throw AppError.new('internalErrorServer', 'Something went wrong on the server.');
            }
        }
    }
}