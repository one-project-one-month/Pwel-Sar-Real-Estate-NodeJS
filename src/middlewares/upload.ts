import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/JPG' ||
    file.mimetype === 'image/webp'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export const uploadMemory = multer({
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 15 }, // 15 files max, 10MB each
  storage: multer.memoryStorage(),
});

export const uploadMultipleMemory = multer({
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 20 }, // 20 files max, 10MB each
  storage: multer.memoryStorage(),
});

