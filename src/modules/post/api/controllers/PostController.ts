import { NextFunction, Request, Response } from 'express';
import { CreatePendingPostUseCase } from 'modules/post/application/usecases/CreatePendingPostUseCase';
import { DeletePostUseCase } from 'modules/post/application/usecases/DeletePostUseCase';
import { GetAllPostsUseCase } from 'modules/post/application/usecases/GetAllPostsUseCase';
import { GetPostDetailUseCase } from 'modules/post/application/usecases/GetPostDetailUseCase';
import { VerifyPostUseCase } from 'modules/post/application/usecases/VerifyPostUseCase';
import { AppError, errorKinds } from 'utils/error-handling';
import fs from 'fs';
import { Container } from '../di/Container';
import { uploadToCloudinary } from 'utils/cloudinary';

export class PostController {
  // eslint-disable-next-line no-unused-vars

  async createPendingPost(req: Request, res: Response, next: NextFunction) {
    const post = JSON.parse(req.body.post);
    const property = JSON.parse(req.body.property);
    const user = req.user as any;
    const files = req.files as Express.Multer.File[];

    if (!files || files.length < 8) {
      res.status(400).json({ message: 'You must upload at least 8 photos.' });
      return;
    }

    const uploadedFiles: Express.Multer.File[] = [];

    try {
      const photoData = await Promise.all(
        files.map(async (file) => {
          const url = await uploadToCloudinary(file.path);
          if (!url) {
            throw AppError.new(
              'internalErrorServer',
              `Photo upload failed for ${file.originalname}`
            );
          }
          uploadedFiles.push(file); // Only push after successful upload
          return { path: url };
        })
      );

      const postUseCase = new CreatePendingPostUseCase(
        Container.postRepository,
        Container.propertyRepository,
        Container.propertyPhotoRepository
      );

      const result = await postUseCase.execute({
        post: { ...post, userId: user.id },
        property: { ...property, ownerId: user.id },
        photos: photoData,
      });

      // Clean up uploaded local files
      for (const file of uploadedFiles) {
        try {
          if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
          }
        } catch (err) {
          console.error(`Failed to delete file ${file.path}`, err);
        }
      }

      res.status(201).json({
        ...result,
        photos: photoData.map((p) => p.path),
      });

    } catch (error) {
      // Clean up all files (even if not uploaded) in case of error
      for (const file of files) {
        try {
          if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
          }
        } catch (err) {
          console.error(`Failed to delete file ${file.path}`, err);
        }
      }

      throw AppError.new(errorKinds.badRequest, `${error}`);
    }
  }


  // eslint-disable-next-line no-unused-vars
  async deletePost(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      console.log(id);

      const deletePostUseCase = new DeletePostUseCase(
        Container.postRepository
        // Container.propertyRepository
      );

      const result = await deletePostUseCase.execute(id);

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
  async getPostDetail(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      const getPostDetailUseCase = new GetPostDetailUseCase(
        Container.postRepository
      );
      const result = await getPostDetailUseCase.execute(id);
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
