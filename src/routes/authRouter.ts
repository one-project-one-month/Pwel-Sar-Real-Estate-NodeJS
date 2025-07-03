import { Router } from "express";
import registerController from "modules/user/api/controllers/auth/RegisterController";


const authRouter = Router();

authRouter.post('/register', registerController.create);

export default authRouter;