import { Router } from 'express';
import { PostController } from 'modules/post/api/controllers/PostController';
import passport from 'passport';

const postRouter = Router();

const postController = new PostController();

postRouter.get(
  '/',
  passport.authenticate('access-jwt', { session: false }),
  postController.getAllPosts
);

postRouter.post(
  '/create',
  passport.authenticate('access-jwt', { session: false }),
  postController.createPendingPost
);

postRouter.patch(
  '/:id/verify',
  passport.authenticate('access-jwt', { session: false }),
  postController.verifyPost
);

export default postRouter;
