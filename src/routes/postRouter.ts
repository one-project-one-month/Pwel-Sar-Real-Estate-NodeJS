import { Router } from 'express';
import { uploadMemory, uploadMultipleMemory } from 'middlewares/upload';
import validationMiddleware from 'middlewares/validationMiddleware';
import postController from 'modules/post/api/controllers/PostsController';
import { multerErrorHandler } from 'modules/post/api/middlewares/multerErrorHandler';
import parseFormDataJsonFields from 'modules/post/api/middlewares/parseFormDataJsonFields';
import {
  PostRegisterSchema,
  PostsArraySchema,
  PostUpdateSchema,
} from 'modules/post/api/middlewares/postValidation';
import passport from 'passport';

const postRouter = Router();
postRouter.post(
  '/register',
  uploadMemory.array('images', 10),
  multerErrorHandler,
  parseFormDataJsonFields, // Parse JSON fields before validation
  validationMiddleware.validateRequestBody(PostRegisterSchema),
  passport.authenticate('access-jwt', { session: false }),
  postController.registerPostAsync
);
// TODO: Add validation middleware for posts array if needed
postRouter.post(
  '/register-multiple',
  uploadMultipleMemory.any(), // Accept any files, will group by fieldname in controller
  multerErrorHandler,
  parseFormDataJsonFields,
  validationMiddleware.validateRequestBody(PostsArraySchema),
  passport.authenticate('access-jwt', { session: false }),
  postController.registerMultiplePostsAsync
);

postRouter.patch(
  '/:id/update',
  validationMiddleware.validateRequestBody(PostUpdateSchema),
  passport.authenticate('access-jwt', { session: false }),
  postController.update
);

export default postRouter;
