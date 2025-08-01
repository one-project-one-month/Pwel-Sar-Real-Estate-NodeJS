import { prisma } from 'libs/prismaClients';
import {
  PaginationReqDto,
  PostQueryParams,
} from 'modules/post/api/dtos/PostDTO';
import {
  IPost,
  Post,
  PostStatus,
  PostType,
} from 'modules/post/domain/entities/Post.entity';
import { IPostRepositories } from 'modules/post/domain/repositories/IPostRepository';
import { AppError } from 'utils/error-handling';

export class PostRepositories implements IPostRepositories {
  async createPending(params: IPost): Promise<Post> {
    try {
      const post = await prisma.post.create({
        data: params,
      });

      return new Post({
        ...post,
        status: post.status as PostStatus,
        type: post.type as PostType,
      });
    } catch (error) {
      throw AppError.new(
        'internalErrorServer',
        `Something went wrong: ${error}`
      );
    }
  }

  async deletePost(id: number): Promise<any> {
    try {
      const post = await prisma.post.delete({
        where: { id },
      });

      console.log(post);

      return post;
    } catch (error) {
      throw AppError.new(
        'internalErrorServer',
        `Something went wrong while deleting post: ${error}`
      );
    }
  }

  async findPostById(id: number): Promise<Post> {
    try {
      const post = await prisma.post.findUnique({
        include: {
          property: true,
        },
        where: {
          id,
        },
      });

      if (!post) {
        throw new Error('Post not found');
      }

      return new Post({
        ...post,
        status: post.status as PostStatus,
        type: post.type as PostType,
      });
    } catch (error) {
      throw AppError.new(
        'internalErrorServer',
        `Something went wrong: ${error}`
      );
    }
  }

  async getAllPosts(
    query: PostQueryParams,
    pagination: PaginationReqDto = { page: 1, limit: 10 }
  ): Promise<{ posts: Post[]; count: number }> {
    try {
      const {
        region,
        township,
        street,
        propertyType,
        postType,
        minPrice,
        maxPrice,
        search,
      } = query;

      const { page = 1, limit = 10 } = pagination;
      const skip = (page - 1) * limit;

      console.log('pagination', JSON.stringify(pagination));

      const where: any = {
        ...(postType && { type: postType }),
        property: {
          ...(region && { region: { contains: region, mode: 'insensitive' } }),
          ...(township && {
            township: { contains: township, mode: 'insensitive' },
          }),
          ...(street && { street: { contains: street, mode: 'insensitive' } }),
          ...(propertyType && { type: propertyType }),
          ...(minPrice && { price: { gte: minPrice } }),
          ...(maxPrice && {
            price: {
              ...(minPrice ? { gte: minPrice } : {}),
              lte: maxPrice,
            },
          }),
        },
      };

      if (search) {
        where.OR = [
          { title: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ];
      }

      const [posts, count] = await Promise.all([
        prisma.post.findMany({
          where,
          include: { property: true },
          skip,
          take: Number(limit),
          orderBy: { createdAt: 'desc' },
        }),
        prisma.post.count({ where }),
      ]);

      const mapped = posts.map((post) => {
        return new Post({
          ...post,
          status: post.status as PostStatus,
          type: post.type as PostType,
        });
      });

      return { posts: mapped, count };
    } catch (error) {
      throw AppError.new(
        'internalErrorServer',
        `Something went wrong: ${error}`
      );
    }
  }

  async verifyPost(params: any): Promise<Post> {
    try {
      console.log(params);
      const post = await prisma.post.update({
        data: {
          adminId: params.adminId,
          status: params.status as PostStatus,
        },
        where: {
          id: params.postId,
        },
      });

      return new Post({
        ...post,
        status: post.status as PostStatus,
        type: post.type as PostType,
      });
    } catch (error) {
      throw AppError.new(
        'internalErrorServer',
        `Something went wrong: ${error}`
      );
    }
  }

  async addToWishList(data: any): Promise<any> {
    try {
      const wishlist = await prisma.wishlist.create({
        data,
      });

      return wishlist;
    } catch (error) {
      throw AppError.new(
        'internalErrorServer',
        `Something went wrong: ${error}`
      );
    }
  }
}
