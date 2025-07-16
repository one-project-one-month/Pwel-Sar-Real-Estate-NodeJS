import { NextFunction } from 'express';
import createPropertyUseCase from 'modules/property/applications/usecase/createPropertyUseCase';
import { PropertyRepository } from 'modules/property/infrastructures/repositories/PropertyRepository';
import { AppError, errorKinds } from 'utils/error-handling';

const createPropertyUsecase = new createPropertyUseCase(
  new PropertyRepository()
);

class PropertyController {
  async createProperty(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await createPropertyUsecase.execute(req.body);
      res.json(result);
    } catch (error) {
      console.log(error);
      error instanceof AppError
        ? next(error)
        : next(
            AppError.new(
              errorKinds.internalServerError,
              'postController : internal Server Error'
            )
          );
    }
  }
}

const propertyController = new PropertyController();
export default propertyController;
