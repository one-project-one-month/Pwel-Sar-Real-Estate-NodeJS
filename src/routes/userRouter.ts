import { Router } from 'express';
import userController from 'modules/user/api/controllers/UsersController';

const userRouter = Router();
userRouter.get('/', userController.getAll);

export default userRouter;
