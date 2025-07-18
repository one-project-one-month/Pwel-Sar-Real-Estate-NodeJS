import { IPostRepository } from '../../domain/repositories/IPostRepository';
import { PostFilterDTO } from '../dtos/PostFilterDTO';

export class GetPostsUseCase {
  // eslint-disable-next-line no-unused-vars
  constructor(private readonly postRepository: IPostRepository) {}

  async execute(filters: PostFilterDTO) {
    // The repository method will be implemented as findAllWithFilters
    return this.postRepository.findAllWithFilters(filters);
  }
}
