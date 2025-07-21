import { Router } from 'express';
import { PostController } from 'modules/post/api/controllers/PostController';
import passport from 'passport';

const postRouter = Router();

const postController = new PostController();

postRouter.post('/', postController.createPendingPost);

postRouter.patch(
  '/:id/verify',
  passport.authenticate('access-jwt', { session: false }),
  postController.verifyPost
);

export default postRouter;
