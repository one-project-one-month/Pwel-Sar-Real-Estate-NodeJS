import { Post } from 'modules/post/domain/entities/Post.entity';
import { updatePostStatusRequestType } from 'modules/post/domain/repositories/IPostRepository';
import { PostRepository } from 'modules/post/infrastructures/repositories/PostRepository';
import { catchErrorAsync } from 'utils/error-handling';

import { PostDTO } from '../dtos/PostDTO';

class UpdatePostStatusUseCase {
  constructor(private readonly postRepository: PostRepository) {}

  async execute(params: updatePostStatusRequestType): Promise<Post> {
    const [error, result] = await catchErrorAsync(
      this.postRepository.updatePostStatus(params)
    );
    if (error) {
      throw error;
    }

    const updatedPost = new PostDTO(result);
    return updatedPost as Post;
  }
}
export default UpdatePostStatusUseCase;
