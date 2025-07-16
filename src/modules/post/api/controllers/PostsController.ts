import { NextFunction, Request, Response } from 'express';
import RegisterPostUseCase from 'modules/post/application/usecase/RegisterPostUseCase';
import UpdatePostStatusUseCase from 'modules/post/application/usecase/UpdatePostStatusUseCase';
import { PostRepository } from 'modules/post/infrastructures/repositories/PostRepository';
import { AppError, errorKinds } from 'utils/error-handling';

const registerPostUseCase = new RegisterPostUseCase(new PostRepository());
const updatePostStatusUseCase = new UpdatePostStatusUseCase(
  new PostRepository()
);

class PostsController {
  async registerPostAsync(req: Request, res: Response, next: NextFunction) {
    console.log(
      "POST http://localhost:5500/api/posts/register", req.body);
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

  // New: Upload multiple posts for a user using the usecase method
  async uploadMultiplePosts(req: Request, res: Response, next: NextFunction) {
    try {
      const { posts, userId } = req.body;
      if (!Array.isArray(posts) || !userId) {
        return res
          .status(400)
          .json({ message: 'userId and posts array are required' });
      }
      const results = await registerPostUseCase.executeMultiple(userId, posts);
      res.status(201).json({ message: 'Posts created', posts: results });
    } catch (error) {
      next(error);
    }
  }
}

const postController = new PostsController();

export default postController;
