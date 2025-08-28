import { IPostRepositories } from 'modules/post/domain/repositories/IPostRepository';
import { IPorpertyPhotoRepository } from 'modules/post/domain/repositories/IPropertyPhotoRepository';
import { IPropertyRepository } from 'modules/post/domain/repositories/IPropertyRepository';
import { AppError } from 'utils/error-handling';

export class CreatePendingPostUseCase {
  constructor(
    // eslint-disable-next-line no-unused-vars
    private readonly postRepository: IPostRepositories,
    // eslint-disable-next-line no-unused-vars
    private readonly propertyRepository: IPropertyRepository,
    private readonly propertyPhotoRepository: IPorpertyPhotoRepository
  ) { }

  async execute(params: any): Promise<any> {
    try {
      console.log(params);
      const post = await this.postRepository.createPending(params.post);

      const property = await this.propertyRepository.create({
        ...params.property,
        postId: post.id,
      });

      if (params.photos?.length > 0) {
        await this.propertyPhotoRepository.createMany(
          params.photos.map((photo: { path: string }) => ({
            path: photo.path,
            propertyId: property.id
          }))
        );
      }

      return { post, property };
    } catch (error) {
      throw AppError.new(
        'internalErrorServer',
        `Something went wrong: ${error}`
      );
    }
  }
}
