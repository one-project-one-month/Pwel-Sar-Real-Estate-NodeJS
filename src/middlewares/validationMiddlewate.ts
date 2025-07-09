import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { AppError, errorKinds } from "../utils/error-handling";

type ValidateProps = {
  schema: z.Schema;
  target: "BODY" | "QUERY";
};

class ValidationMiddleware {
  private validate(props: ValidateProps) {
    return (req: Request, res: Response, next: NextFunction) => {
      const { schema, target } = props;
      const validation = schema.safeParse(
        target === "BODY" ? req.body ?? {} : req.query ?? {}
      );
      if (!validation.success) {
        next(
          AppError.new(
            errorKinds.validationFailed,
            "validation Failed",
            Object.fromEntries(
              Object.entries(validation.error?.formErrors.fieldErrors).map(
                ([key, value]) => [key, value ?? []]
              )
            )
          )
        );
      } else {
        next();
      }
    };
  }

  validateRequestQuery(schema: z.Schema) {
    return this.validate({
      schema,
      target: "QUERY",
    });
  }

  validateRequestBody(schema: z.Schema) {
    return this.validate({
      schema,
      target: "BODY",
    });
  }
}

export default new ValidationMiddleware();