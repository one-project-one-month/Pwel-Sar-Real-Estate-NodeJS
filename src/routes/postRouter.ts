import { Router } from 'express';
import validationMiddleware from 'middlewares/validationMiddleware';
import postController from 'modules/post/api/controllers/PostsController';
import {
  PostRegisterSchema,
  PostUpdateSchema,
} from 'modules/post/api/middlewares/postValidation';
import passport from 'passport';

const postRouter = Router();
postRouter.post(
  '/register',
  validationMiddleware.validateRequestBody(PostRegisterSchema),
  passport.authenticate('access-jwt', { session: false }),
  postController.registerPostAsync
);
postRouter.patch(
  '/:id/update',
  validationMiddleware.validateRequestBody(PostUpdateSchema),
  passport.authenticate('access-jwt', { session: false }),
  postController.update
);

export default postRouter;
