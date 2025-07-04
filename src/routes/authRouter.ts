import { Router } from "express";
import registerController from "modules/user/api/controllers/auth/RegisterController";
import { validate } from "modules/user/api/middlewares/validate";
import { RegisterSchema } from "utils/auth/AuthValidation";


const authRouter = Router();

authRouter.post('/register', validate(RegisterSchema),registerController.create);

export default authRouter;