import 'reflect-metadata';
import { Router } from 'express';
import { UserController } from 'modules/user/user.controller';
import { container } from 'tsyringe';

const userRouter = Router();
const userController = container.resolve(UserController);

userRouter.get('/', userController.getAllUsersAsync.bind(userController));

export default userRouter;
