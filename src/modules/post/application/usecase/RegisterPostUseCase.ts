import {
  CreatePostAndPropertyRequestType,
  IPostRepository,
} from 'modules/post/domain/repositories/IPostRepository';
import { AppError, catchErrorAsync, errorKinds } from 'utils/error-handling';

import { PostDTO } from '../dtos/PostDTO';
// import { PropertyDTO } from '../dtos/PropertyDTO'; // Uncomment if you have a PropertyDTO

class RegisterPostUseCase {
  constructor(private readonly _postRepository: IPostRepository) {}

  async execute(
    params: CreatePostAndPropertyRequestType
  ): Promise<{ post: PostDTO; property: any }> {
    const [error, result] = await catchErrorAsync(
      this._postRepository.createPostAndProperty(params)
    );
    if (error) {
      throw AppError.new(
        errorKinds.internalServerError,
        'Failed to create post and property: ' + error.message
      );
    }
    if (!result) {
      throw AppError.new(
        errorKinds.internalServerError,
        'No result returned from createPostAndProperty'
      );
    }
    return {
      post: new PostDTO(result.post),
      property: result.property, // or new PropertyDTO(result.property) if you have one
    };
  }

  async executeMultiple(
    userId: number,
    posts: CreatePostAndPropertyRequestType[]
  ): Promise<{ post: PostDTO; property: any }[]> {
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
