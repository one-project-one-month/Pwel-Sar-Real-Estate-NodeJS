import { NextFunction, Request, Response } from 'express';
import RegisterPostUseCase from 'modules/post/application/usecase/RegisterPostUseCase';
import UpdatePostStatusUseCase from 'modules/post/application/usecase/UpdatePostStatusUseCase';
import { PostRepository } from 'modules/post/infrastructures/repositories/PostRepository';
import { PropertyRepository } from 'modules/property/infrastructures/repositories/PropertyRepository';
import { AppError, errorKinds } from 'utils/error-handling';

const registerPostUseCase = new RegisterPostUseCase(
  new PostRepository(),
  new PropertyRepository()
);
const updatePostStatusUseCase = new UpdatePostStatusUseCase(
  new PostRepository()
);

class PostsController {
  async registerPostAsync(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await registerPostUseCase.execute(req.body);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      error instanceof AppError
        ? next(error)
        : next(
            AppError.new(
              errorKinds.internalServerError,
              'postController : internal Server Error'
            )
          );
    }
  }
  async update(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { id: approvingAdminId }: { id: number } = req.user as {
        id: number;
      };
      const { status } = req.body;
      const postId = parseInt(req.params.id, 10);
      const updatedPost = await updatePostStatusUseCase.execute({
        approvingAdminId,
        postId,
        status,
      });
      res.status(200).json({
        message: 'Post registration status updated successfully',
        post: updatedPost,
      });
    } catch (error) {
      error instanceof AppError
        ? next(error)
        : next(
            AppError.new(
              errorKinds.internalServerError,
              'userController : internal Server Error'
            )
          );
    }
  }
}

const postController = new PostsController();

export default postController;
