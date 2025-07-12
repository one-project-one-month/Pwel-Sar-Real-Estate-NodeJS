import { NextFunction, Request, Response } from 'express';
import { CreateRatingUseCase } from 'modules/agent/applications/usecase/CreateRatingUseCase';
import { RatingRepository } from 'modules/agent/infrastructures/RatingRepository';
import { AppError } from 'utils/error-handling';

const createRatingUseCase = new CreateRatingUseCase(new RatingRepository());

class RatingController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      await createRatingUseCase.execute({
        agentId: req.body.agentId,
        point: req.body.point,
        userId: 1, //TODO: get from token
      });
      res.sendStatus(200);
    } catch (error) {
      console.log('Errorr ======> ', error);
      error instanceof AppError
        ? next(error)
        : next(
            AppError.new(
              'internalErrorServer',
              'Something went wrong on the server.'
            )
          );
    }
  }
}

const ratingController = new RatingController();
export default ratingController;
