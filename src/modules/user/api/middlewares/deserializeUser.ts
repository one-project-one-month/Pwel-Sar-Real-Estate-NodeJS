
import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "utils/auth/jwt";
import { AppError } from "utils/error-handling";

export const deserializeUser = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(AppError.new("invalidToken", "No token provided"));
  }

  const token = authHeader.split(" ")[1];
  const decoded = verifyJwt(token);

  if (!decoded) {
    return next(AppError.new("invalidToken", "Invalid or expired token"));
  }

  (req as any).user = decoded;
  next();
};
