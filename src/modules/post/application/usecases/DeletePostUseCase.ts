import { IPostRepositories } from 'modules/post/domain/repositories/IPostRepository';
// import { IPropertyRepository } from 'modules/post/domain/repositories/IPropertyRepository';
import { AppError } from 'utils/error-handling';

export class DeletePostUseCase {
  constructor(
    // eslint-disable-next-line no-unused-vars
    private readonly postRepository: IPostRepositories
  ) // private readonly propertyRepository: IPropertyRepository
  {}

  async execute(postId: number): Promise<any> {
    try {
      const post = await this.postRepository.findPostById(postId);

      console.log(post);

      if (!post) {
        throw new Error('Post not found');
      }

      //   if (post.property) await this.propertyRepository.delete();

      const deletedPost = await this.postRepository.deletePost(postId);

      return deletedPost;
    } catch (error) {
      throw AppError.new(
        'internalErrorServer',
        `Something went wrong while deleting post: ${error}`
      );
    }
  }
}
