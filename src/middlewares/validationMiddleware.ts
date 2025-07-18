import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

import { AppError, errorKinds } from '../utils/error-handling';

interface ValidateProps {
  schema: z.Schema;
  target: 'BODY' | 'PARAMS' | 'QUERY';
}

class ValidationMiddleware {
  validateRequestBody(schema: z.Schema) {
    return this.validate({
      schema,
      target: 'BODY',
    });
  }

  validateRequestParams(schema: z.Schema) {
    return this.validate({
      schema,
      target: 'PARAMS',
    });
  }

  validateRequestQuery(schema: z.Schema) {
    return this.validate({
      schema,
      target: 'QUERY',
    });
  }

  private validate(props: ValidateProps) {
    return (req: Request, res: Response, next: NextFunction) => {
      const { schema, target } = props;
      let data;
      if (target === 'BODY') data = req.body ?? {};
      else if (target === 'QUERY') data = req.query ?? {};
      else if (target === 'PARAMS') data = req.params ?? {};

      const validation = schema.safeParse(data);
      if (!validation.success) {
        next(
          AppError.new(
            errorKinds.validationFailed,
            'validation Failed',
            Object.fromEntries(
              Object.entries(validation.error?.formErrors.fieldErrors).map(
                ([key, value]) => [key, value ?? []]
              )
            )
          )
        );
      } else {
        if (target === 'BODY') (req as any).validatedBody = validation.data;
        else if (target === 'QUERY')
          (req as any).validatedQuery = validation.data;
        else if (target === 'PARAMS')
          (req as any).validatedParams = validation.data;
        next();
      }
    };
  }
}

export default new ValidationMiddleware();
