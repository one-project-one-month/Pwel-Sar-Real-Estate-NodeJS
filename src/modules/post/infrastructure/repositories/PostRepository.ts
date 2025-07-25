import { prisma } from 'libs/prismaClients';
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

  async getAllPosts(): Promise<Post[]> {
    try {
      const posts = await prisma.post.findMany({
        include: {
          property: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      //   console.log(posts);

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
