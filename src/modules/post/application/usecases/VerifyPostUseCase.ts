import { PostDTO } from 'modules/post/api/dtos/PostDTO';
import { IPostRepositories } from 'modules/post/domain/repositories/IPostRepository';
import { AppError } from 'utils/error-handling';

export class VerifyPostUseCase {
  constructor(
    // eslint-disable-next-line no-unused-vars
    private readonly postRepository: IPostRepositories
  ) {}

  async execute(params: {
    adminId: number;
    postId: number;
    status: string;
  }): Promise<PostDTO> {
    try {
      const post = await this.postRepository.verifyPost(params);

      console.log(post);

      return new PostDTO(post);
    } catch (error) {
      throw AppError.new(
        'internalErrorServer',
        `Something went wrong: ${error}`
      );
    }
  }
}
