import { Router } from 'express';
import userController from 'modules/user/api/controllers/UsersController';
import { upload } from 'modules/user/api/middlewares/multer';
import passport from 'passport';

const userRouter = Router();
userRouter.get('/', userController.getAll);

userRouter.post(
    '/upload-photo',
    upload.fields([{ maxCount: 1, name: 'photo' }]),
    passport.authenticate('access-jwt', { session: false }),
    userController.uploadPhoto);

export default userRouter;
