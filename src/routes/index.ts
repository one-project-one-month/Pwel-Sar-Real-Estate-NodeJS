import { Router } from 'express';
import { NextFunction, Request, Response } from 'express';
import { checkPermissionMiddleware } from 'modules/user/api/middlewares/checkPermissionMIddleware';
import { AppError, errorKinds } from 'utils/error-handling';

import agentRouter from './agentRouter';
import authRouter from './authRouter';
import ownerRoute from './ownerRoute';
import userRouter from './userRouter';

const router = Router();
router.get(
  '/healthCheck',
  checkPermissionMiddleware({ action: 'edit', resource: 'property' }),
  async (req: Request, res: Response) => {
    res.sendStatus(200);
  }
);

//register route

router.use(
  '/owner',
  //   passport.authenticate('jwt-access', { session: false }),
  ownerRoute
);
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

// eslint-disable-next-line no-unused-vars
router.use((err: any, req: Request, res: Response, next: NextFunction) => {
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
