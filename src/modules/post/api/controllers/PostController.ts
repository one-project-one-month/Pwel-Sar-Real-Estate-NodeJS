import { NextFunction, Request, Response } from 'express';
import { CreatePendingPostUseCase } from 'modules/post/application/usecases/CreatePendingPostUseCase';
import { GetAllPostsUseCase } from 'modules/post/application/usecases/GetAllPostsUseCase';
import { VerifyPostUseCase } from 'modules/post/application/usecases/VerifyPostUseCase';
import { AppError, errorKinds } from 'utils/error-handling';

import { Container } from '../di/Container';

export class PostController {
  // eslint-disable-next-line no-unused-vars
  async createPendingPost(req: Request, res: Response, next: NextFunction) {
    try {
      const { post, property } = req.body;

      const user = req.user as any;

      const postUseCase = new CreatePendingPostUseCase(
        Container.postRepository,
        Container.propertyRepository
      );

      const result = await postUseCase.execute({
        post: { ...post, userId: user.id },
        property: { ...property, ownerId: user.id },
      });

      res.status(201).json(result);
    } catch (error) {
      throw AppError.new(errorKinds.badRequest, `${error}`);
    }
  }
  // eslint-disable-next-line no-unused-vars
  async getAllPosts(req: Request, res: Response, next: NextFunction) {
    try {
      const getAllPostsUseCase = new GetAllPostsUseCase(
        Container.postRepository
        // Container.propertyRepository
      );

      const result = await getAllPostsUseCase.execute();

      res.status(200).json(result);
    } catch (error) {
      throw AppError.new(errorKinds.badRequest, `${error}`);
    }
  }

  // eslint-disable-next-line no-unused-vars
  async verifyPost(req: Request, res: Response, next: NextFunction) {
    try {
      const { status } = req.body;
      const postId = Number(req.params.id);
      const admin = req.user as any;

      console.log(admin, postId, status);

      const verifyPostUseCase = new VerifyPostUseCase(Container.postRepository);

      const result = await verifyPostUseCase.execute({
        adminId: admin.id,
        postId,
        status,
      });

      res.status(201).json(result);
    } catch (error) {
      throw AppError.new(errorKinds.badRequest, `${error}`);
    }
  }
}
