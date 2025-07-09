import 'reflect-metadata';
import { Router } from 'express';
import { NextFunction, Request, Response } from 'express';
import { AppError, errorKinds } from 'utils/error-handling';

import agentRouter from './agentRouter';
import authRouter from './authRouter';
import userRouter from './userRouter';
import { CheckPermissionMiddleware } from 'middlewares/checkPermissionMIddleware';
import { container } from 'tsyringe';

const router = Router();
const checkPermissionMiddleware = container.resolve(CheckPermissionMiddleware);

router.get(
  '/healthCheck',
  checkPermissionMiddleware.checkPermissionMiddleware({
    action: 'edit',
    resource: 'property',
  }),
  async (req: Request, res: Response) => {
    res.sendStatus(200);
  }
);

//register route
router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/agent-profiles', agentRouter);

//404 handler
router.use((req: Request, res: Response, next: NextFunction) => {
  // send 404 error
  return next(AppError.new(errorKinds.notFound, 'Not Found'));
  // send 404 error
});

// error handling
router.use((err: any, req: Request, res: Response) => {
  if (err instanceof AppError) {
    res
      .status(err.getStatus())
      .json({
        message: err.message,
        payload: err.payload,
      })
      .end();
  }
});

export default router;
