import { IPostRepositories } from 'modules/post/domain/repositories/IPostRepository';
import { IPropertyRepository } from 'modules/post/domain/repositories/IPropertyRepository';
import { AppError } from 'utils/error-handling';

export class CreatePendingPostUseCase {
  constructor(
    // eslint-disable-next-line no-unused-vars
    private readonly postRepository: IPostRepositories,
    // eslint-disable-next-line no-unused-vars
    private readonly propertyRepository: IPropertyRepository
  ) {}

  async execute(params: any): Promise<any> {
    try {
      const post = await this.postRepository.createPending(params.post);

      const property = await this.propertyRepository.create({
        ...params.property,
        postId: post.id,
      });

      return { post, property };
    } catch (error) {
      throw AppError.new(
        'internalErrorServer',
        `Something went wrong: ${error}`
      );
    }
  }
}
