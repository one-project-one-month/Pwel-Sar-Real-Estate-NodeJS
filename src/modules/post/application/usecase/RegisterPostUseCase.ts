import {
  CreatePostAndPropertyRequestType,
  IPostRepository,
} from 'modules/post/domain/repositories/IPostRepository';
import { catchErrorAsync } from 'utils/error-handling';

import { PostDTO } from '../dtos/PostDTO';

class RegisterPostUseCase {
  constructor(private readonly _postRepository: IPostRepository) {}

  async execute(params: CreatePostAndPropertyRequestType) {
    const [error, result] = await catchErrorAsync(
      this._postRepository.createPostAndProperty(params)
    );
    if (error) {
      throw error;
    }
    if (!result) {
      throw new Error('No result returned from createPostAndProperty');
    }
    // Optionally, you can return a DTO or both post and property
    return {
      post: new PostDTO(result.post),
      property: result.property,
    };
  }

  // New: Create multiple posts for a user
  async executeMultiple(
    userId: number,
    posts: CreatePostAndPropertyRequestType[]
  ) {
    const results = [];
    for (const postData of posts) {
      postData.post.userId = userId;
      const result = await this.execute(postData);
      results.push(result);
    }
    return results;
  }
}
export default RegisterPostUseCase;
