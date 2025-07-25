import { IPostRepositories } from 'modules/post/domain/repositories/IPostRepository';
// import { IPropertyRepository } from 'modules/post/domain/repositories/IPropertyRepository';
import { AppError } from 'utils/error-handling';

export class GetPostDetailUseCase {
  constructor(
    // eslint-disable-next-line no-unused-vars
    private readonly postRepository: IPostRepositories
  ) // private readonly propertyRepository: IPropertyRepository
  {}

  async execute(postId: number): Promise<any> {
    try {
      const post = await this.postRepository.findPostById(postId);
      //   const properties = await this.propertyRepository.getAllProperties();

      return post;
    } catch (error) {
      throw AppError.new(
        'internalErrorServer',
        `Something went wrong while fetching post details: ${error}`
      );
    }
  }
}
