import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import GetUserListUseCase from 'modules/user/applications/usecase/GetUserListUseCase';
import { UploadPhotoUseCase } from 'modules/user/applications/usecase/UploadPhotoUseCase';
import { UserRepository } from 'modules/user/infrastructures/repositories/UserRepository';
import { uploadToCloudinary } from 'utils/cloudinary';
import { AppError, catchErrorAsync, errorKinds } from 'utils/error-handling';

import { Container } from '../di/Container';
import { GetUserListParamType } from '../params/getUserlistParamSchema';

const getUserListUseCase = new GetUserListUseCase(new UserRepository());

class UsersController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const { limit, page, search, searchBy } = req.query;
            const pageNum = parseInt(page as string, 10) || undefined;
            const limitNum = parseInt(limit as string, 10) || undefined;
            const result = await getUserListUseCase.execute({
                limit: limitNum,
                page: pageNum,
                search: search as string | undefined,
                searchBy: searchBy as GetUserListParamType['searchBy'],
            });
            res.status(200).json(result);
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

    async uploadPhoto(req: Request, res: Response, next: NextFunction) {
        console.log(req.files);
        const user = req.user as any;
        if (!user) throw AppError.new(errorKinds.notAuthorized, 'Unauthorized');

        let photoUrl: null | string = null;

        // eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
        const files = req.files as { [fieldname: string]: Express.Multer.File[] };
        const photoPath = files.photo?.[0].path;

        try {
            if (photoPath) {
                try {
                    photoUrl = await uploadToCloudinary(photoPath);
                } catch (error) {
                    console.log(error);
                    fs.unlinkSync(photoPath);
                }
            }

            const uploadPhoto = new UploadPhotoUseCase(Container.userRepository);
            const [error, result] = await catchErrorAsync(
                uploadPhoto.execute(user.id, photoUrl!)
            );

            if (error) {
                console.error('Error in registerUseCase:', error);
                next(error);
                return;
            }

            console.log('Photo uploaded: ', result);

            res.status(201).json({ photo: photoUrl });
        } catch (error) {
            console.log('Error at registeration');
            fs.unlinkSync(photoPath);
            next(error);
        }
    }
}

const userController = new UsersController();
export default userController;
