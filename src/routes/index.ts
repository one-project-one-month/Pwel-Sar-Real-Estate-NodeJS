import AppConfig from "config/env/app-config";
import { Router } from "express";
import { NextFunction, Response, Request } from "express";
import { AppError, errorKinds } from "utils/error-handling";
import userRouter from "./userRouter";

const router = Router()
router.get(
    "/healthCheck",
    async (req: Request, res: Response, next: NextFunction) => {
        next(AppError.new(
            errorKinds.internalServerError,
            "internal Server Error",
        ));
    }
);

//register route
router.use('/users', userRouter)

//404 handler
router.use((req: Request, res: Response, next: NextFunction) => {
    // send 404 error
    return next(AppError.new(errorKinds.notFound, "Not Found"));
});

// error handling
router.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        res.status(err.getStatus()).json({
            message: err.message,
            payload: err.payload
        }).end();
    }
});

export default router;