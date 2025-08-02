import { prisma } from 'libs/prismaClients';
import {
  IPost,
  Post,
  PostStatus,
  PostType,
} from 'modules/post/domain/entities/Post.entity';
import { IPostRepositories } from 'modules/post/domain/repositories/IPostRepository';
import { AppError } from 'utils/error-handling';
import { buildRangeFilter } from 'utils/post/buildFilterRange';

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

  async getAllPosts(filterOption: any): Promise<Post[]> {
    try {
      const {
        bathRoomMax,
        bathRoomMin,
        bedRoomMax,
        bedRoomMin,
        currency,
        floorMax,
        floorMin,
        isAdminPost,
        isAgentPost,
        isOwnerPost,
        lengthMax,
        lengthMin,
        postType,
        region,
        status,
        street,
        township,
        widthMax,
        widthMin,
      } = filterOption;

      const posts = await prisma.post.findMany({
        include: { property: true },
        orderBy: { createdAt: 'desc' },
        where: {
          property: {
            some: {
              ...(township && {
                township: { contains: township, mode: 'insensitive' },
              }),
              ...(region && {
                region: { contains: region, mode: 'insensitive' },
              }),
              ...(currency && { currency }),
              ...(street && {
                street: { contains: street, mode: 'insensitive' },
              }),
              ...buildRangeFilter('bedRoom', bedRoomMin, bedRoomMax),
              ...buildRangeFilter('bathRoom', bathRoomMin, bathRoomMax),
              ...buildRangeFilter('floor', floorMin, floorMax),
              ...buildRangeFilter('length', lengthMin, lengthMax),
              ...buildRangeFilter('width', widthMin, widthMax),
            },
          },
          ...(status && { status: status as PostStatus }),
          ...(postType && { type: postType as PostType }),
          ...(isAgentPost && {
            user: {
              roleId: 3,
            },
          }),
          ...(isAdminPost && {
            user: {
              roleId: 1,
            },
          }),
          ...(isOwnerPost && {
            user: {
              roleId: 2,
            },
          }),
        },
      });

      return posts.map((post) => {
        return new Post({
          ...post,
          status: post.status as PostStatus,
          type: post.type as PostType,
        });
      });
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
}
