import { IUserRepository } from "modules/user/domain/repositories";
import { AppError } from 'utils/error-handling';


export class UploadPhotoUseCase {
    // eslint-disable-next-line no-unused-vars
    constructor(private readonly userRepository: IUserRepository) { }

    async execute(userId: number, photoUrl: string): Promise<void> {
        try {
            const user = await this.userRepository.uploadPhoto(userId, photoUrl);

            if (!user) {
                throw AppError.new(
                    'notFound',
                    `User with ID ${userId} not found`
                );
            }
        } catch (error) {
            throw AppError.new(
                'internalErrorServer',
                `Something went wrong: ${error}`
            );
        }
    }
}