import { NextFunction, Request, Response } from 'express';
import multer from 'multer';

export function multerErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof multer.MulterError) {
    res.status(400).json({
      message: `${err.message}, or (You can upload up to 10 images for a post.)`,
    });
    return;
  }
  next(err);
}

export function multerMultipleErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof multer.MulterError) {
    res.status(400).json({
      message: `${err.message}`,
    });
    return;
  }
  next(err);
}
