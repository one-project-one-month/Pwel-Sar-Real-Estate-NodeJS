import { Router } from "express";
import authController from "modules/user/api/controllers/auth/AuthController";
import { deserializeUser } from "modules/user/api/middlewares/deserializeUser";
import { validate } from "modules/user/api/middlewares/validate";
import { LoginSchema, RegisterSchema } from "utils/auth/AuthValidation";

const authRouter = Router();

authRouter.post("/register", validate(RegisterSchema), authController.create);
authRouter.post("/login", validate(LoginSchema), authController.login);

authRouter.get("/", deserializeUser, (req, res) => {
    res.status(200).json({
        message: "Welcome to the authentication API",
    });
});

export default authRouter;
