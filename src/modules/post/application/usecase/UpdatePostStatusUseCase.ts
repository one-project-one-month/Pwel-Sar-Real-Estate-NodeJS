import {
  IPostRepository,
  updatePostStatusRequestType,
} from 'modules/post/domain/repositories/IPostRepository';
import { catchErrorAsync } from 'utils/error-handling';

import { PostDTO } from '../dtos/PostDTO';

class UpdatePostStatusUseCase {
  // eslint-disable-next-line no-unused-vars
  constructor(private readonly postRepository: IPostRepository) {}

  async execute(params: updatePostStatusRequestType): Promise<PostDTO> {
    const [error, result] = await catchErrorAsync(
      this.postRepository.updatePostStatus(params)
    );
    if (error) {
      throw error;
    }
    if (!result) {
      throw new Error('No result returned from updatePostStatus');
    }
    return new PostDTO(result);
  }
}
export default UpdatePostStatusUseCase;
