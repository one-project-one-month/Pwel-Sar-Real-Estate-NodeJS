import { NextFunction, Request, Response } from 'express';
import cloudImageQueue from 'jobs/queqe/cloudImageQueue';
import { PostDetailDTO } from 'modules/post/application/dtos/PostDetailDTO';
import { PostFilterDTO } from 'modules/post/application/dtos/PostFilterDTO';
import { GetPostDetailUseCase } from 'modules/post/application/usecase/GetPostDetailUseCase';
import { GetPostsUseCase } from 'modules/post/application/usecase/GetPostsUseCase';
import RegisterPostUseCase from 'modules/post/application/usecase/RegisterPostUseCase';
import UpdatePostStatusUseCase from 'modules/post/application/usecase/UpdatePostStatusUseCase';
import { PostRepository } from 'modules/post/infrastructures/repositories/PostRepository';
import { AppError, errorKinds } from 'utils/error-handling';

const registerPostUseCase = new RegisterPostUseCase(new PostRepository());
const updatePostStatusUseCase = new UpdatePostStatusUseCase(
  new PostRepository()
);
const getPostsUseCase = new GetPostsUseCase(new PostRepository());
const getPostDetailUseCase = new GetPostDetailUseCase(new PostRepository());

class PostsController {
  getAll = async (req: Request, res: Response, next: NextFunction) => {
    console.log('reached controller');
    try {
      // Use the validated query from the middleware for all filters
      const filters = new PostFilterDTO((req as any).validatedQuery);
      console.log('filters:', filters);
      const posts = await getPostsUseCase.execute(filters);
      res.status(200).json(posts);
    } catch (error) {
      console.error(error);
      error instanceof AppError
        ? next(error)
        : next(
            AppError.new(
              errorKinds.internalServerError,
              'postController : internal Server Error'
            )
          );
    }
  };

  getDetail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = (req as any).validatedParams ?? req.params;
      const dto = new PostDetailDTO({ id: Number(id) });
      const post = await getPostDetailUseCase.execute(dto);
      if (!post) {
        res.status(404).json({ message: 'Post not found' });
        return
      }
      res.status(200).json(post);
    } catch (error) {
      console.error(error);
      error instanceof AppError
        ? next(error)
        : next(
            AppError.new(
              errorKinds.internalServerError,
              'postController : internal Server Error'
            )
          );
    }
  };

  // New: Upload multiple posts for a user using the usecase method
  registerMultiplePostsAsync = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let posts = req.body.posts;
      if (typeof posts === 'string') {
        posts = JSON.parse(posts);
      }
      if (!Array.isArray(posts)) {
        res.status(400).json({ message: 'posts array is required' });
        return;
      }
      if (posts.length > 3) {
        res
          .status(400)
          .json({ message: 'You can only upload up to 3 posts at a time.' });
        return;
      }

      // Validate image count for each post before processing
      if (req.files && Array.isArray(req.files)) {
        for (let i = 0; i < posts.length; i++) {
          const imagesForPost = req.files.filter(
            (file) => file.fieldname === `images_${i}`
          );
          console.log(imagesForPost);
          if (imagesForPost.length > 10) {
            res.status(400).json({
              message: `Maximum 10 images allowed per post (post index: ${i})`,
            });
            return;
          }
        }
      }

      const results = [];
      for (let i = 0; i < posts.length; i++) {
        const { post, property } = posts[i];
        const result = await registerPostUseCase.execute({ post, property });
        results.push(result);
        try {
          // Queue images for this property (fieldname: images_0, images_1, ...)
          if (req.files && Array.isArray(req.files)) {
            await this.queueImagesForProperty(
              req.files,
              result.property.id,
              `images_${i}`
            );
          }
        } catch (error) {
          console.log(error);
        }
      }
      res.status(201).json({ message: 'Posts created', posts: results });
    } catch (error) {
      next(error);
    }
  };

  registerPostAsync = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // console.log('POST http://localhost:5500/api/posts/register', req.body);
    // console.log('image', req.files);
    try {
      const post = req.body.post;
      const property = req.body.property;

      const result = await registerPostUseCase.execute({ post, property });

      // Image upload queue logic
      try {
        if (req.files && Array.isArray(req.files)) {
          await this.queueImagesForProperty(
            req.files,
            result.property.id,
            'images'
          );
        }
      } catch (error) {
        console.log(error);
      }

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
  };

  update = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
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
  };

  // Helper to queue images for a property by fieldname
  private queueImagesForProperty = async (
    files: Express.Multer.File[],
    propertyId: number,
    fieldname: string
  ) => {
    const images = files.filter((file) => file.fieldname === fieldname);
    for (const file of images) {
      await cloudImageQueue.add('upload', {
        buffer: file.buffer,
        propertyId,
      });
    }
  };
}

const postController = new PostsController();

export default postController;
