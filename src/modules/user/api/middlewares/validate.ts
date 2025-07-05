import { NextFunction, Request, Response } from "express";
import { ZodError, ZodSchema } from "zod";

import { body, validationResult } from "express-validator";


export const validate = (schema: ZodSchema<any>) => 
  (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse(req.body)
        next()
    } catch (error) {
        if (error instanceof ZodError) {
             res.status(400).json({ message: "Validation Error", errors: error.errors });
        }
        next(error);
    }
  }

// export const userRegisterValidate = (req: Request, res: Response, next: NextFunction) => {
//   body("username").notEmpty().trim().isLength({ min: 2, max: 30 }).withMessage("Username is required").isString().withMessage("Username must be between 2 and 30 characters long"),
//   body("email").isEmail().notEmpty().trim().isLength({ max: 52 }).withMessage("Invalid email format"),
//   body("password").isLength({ min: 8 }).notEmpty().trim().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, "g").withMessage("Password must be at least 8 characters long"),
//   (req: Request, res: Response, next: NextFunction) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ message: "Validation Error", errors: errors.array() });
//     }
//     next();
//   }
// }