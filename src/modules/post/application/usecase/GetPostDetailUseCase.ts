import { PostRepository } from 'modules/post/infrastructures/repositories/PostRepository';

import { PostDetailDTO } from '../dtos/PostDetailDTO';

export class GetPostDetailUseCase {
  // eslint-disable-next-line no-unused-vars
  constructor(private postRepository: PostRepository) {}

  async execute(dto: PostDetailDTO) {
    return this.postRepository.findById(dto.id);
  }
}
