import { Router } from 'express';
import { PostController } from 'modules/post/api/controllers/PostController';
import { upload } from 'modules/user/api/middlewares/multer';
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
  upload.array('photos'),
  passport.authenticate('access-jwt', { session: false }),
  postController.createPendingPost
);

postRouter.patch(
  '/:id/verify',
  passport.authenticate('access-jwt', { session: false }),
  postController.verifyPost
);

postRouter.get(
  '/:id',
  //   passport.authenticate('access-jwt', { session: false }),
  postController.getPostDetail
);

postRouter.delete(
  '/:id',
  passport.authenticate('access-jwt', { session: false }),
  postController.deletePost
);

export default postRouter;
