import { PostDTO } from 'modules/post/api/dtos/PostDTO';
import { IPostRepositories } from 'modules/post/domain/repositories/IPostRepository';
import { AppError } from 'utils/error-handling';

export class GetAllPostsUseCase {
  constructor(
    // eslint-disable-next-line no-unused-vars
    private readonly postRepository: IPostRepositories
  ) {}

  async execute(): Promise<PostDTO[]> {
    try {
      const posts = await this.postRepository.getAllPosts();

      console.log(posts);

      return posts.map((post) => new PostDTO(post));
    } catch (error) {
      throw AppError.new(
        'internalErrorServer',
        `Something went wrong: ${error}`
      );
    }
  }
}
