import {
  createPendingPostRequestType,
  IPostRepository,
} from 'modules/post/domain/repositories/IPostRepository';
import { IPropertyRepository } from 'modules/property/domain/repositories/IPropertyRepository';
import { inject, injectable } from 'tsyringe';
import { catchErrorAsync } from 'utils/error-handling';

import { PostDTO } from '../dtos/PostDTO';

@injectable()
class RegisterPostUseCase {
  constructor(
    @inject('IPostRepository') private readonly postRepository: IPostRepository,
    @inject('IPropertyRepository')
    private readonly propertyRepository: IPropertyRepository
  ) {}
  async execute(post: createPendingPostRequestType) {
    const newProperty = await this.propertyRepository.create(post.property);
    const [error, result] = await catchErrorAsync(
      this.postRepository.createPendingPost(post)
    );
    if (error) {
      throw error;
    }
    const newPost = new PostDTO(result);
    console.log(newProperty, '<===== new property');
    return newPost;
  }
}
export default RegisterPostUseCase;
