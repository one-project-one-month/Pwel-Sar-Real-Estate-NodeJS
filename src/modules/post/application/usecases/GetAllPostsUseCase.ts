import { PaginationDto } from 'helpers/pagination';
import {
  PaginationReqDto,
  PostDTO,
  PostQueryParams,
} from 'modules/post/api/dtos/PostDTO';
import { IPostRepositories } from 'modules/post/domain/repositories/IPostRepository';
import { AppError } from 'utils/error-handling';

export class GetAllPostsUseCase {
  constructor(private readonly postRepository: IPostRepositories) {}

  async execute(
    query: PostQueryParams,
    pagination: PaginationReqDto
  ): Promise<PaginationDto<PostDTO>> {
    try {
      const { posts, count } = await this.postRepository.getAllPosts(
        query,
        pagination
      );

      return {
        data: posts.map((post) => new PostDTO(post)),
        totalCount: count,
        currentPage: pagination.page,
        totalPages: Math.ceil(count / pagination.limit),
        hasNextPage: pagination.page < Math.ceil(count / pagination.limit),
        hasPreviousPage: pagination.page > 1,
      };
    } catch (error) {
      throw AppError.new(
        'internalErrorServer',
        `Something went wrong: ${error}`
      );
    }
  }
}
