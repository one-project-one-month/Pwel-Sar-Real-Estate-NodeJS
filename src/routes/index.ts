import { Router } from "express";
import { NextFunction, Response, Request } from "express";
import { AppError, errorKinds } from "utils/error-handling";
import userRouter from "./userRouter";
import authRouter from "./authRouter";
import agentRouter from "./agentRouter";
import { checkPermissionMiddleware } from "modules/user/api/middlewares/checkPermissionMIddleware";

const router = Router();
router.get(
  "/healthCheck",
  checkPermissionMiddleware({ resource: "property", action: "edit" }),
  async (req: Request, res: Response, next: NextFunction) => {
    res.sendStatus(200);
  }
);

//register route
router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/agent-profiles", agentRouter);

//404 handler
router.use((req: Request, res: Response, next: NextFunction) => {
  // send 404 error
  return next(AppError.new(errorKinds.notFound, "Not Found"));
  // send 404 error
});

// error handling
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
