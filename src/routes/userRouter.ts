import { Router } from 'express';
import userController from 'modules/user/api/controllers/UsersController';
import passport from 'passport';

const userRouter = Router();
userRouter.get('/', userController.getAll);

userRouter.get(
  '/wishlist',
  passport.authenticate('access-jwt', { session: false }),
  userController.getWishlist
);

export default userRouter;
