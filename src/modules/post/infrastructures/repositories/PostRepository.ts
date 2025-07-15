import { prisma } from 'libs/prismaClients';
import {
  Post,
  PostStatus,
  PostType,
} from 'modules/post/domain/entities/Post.entity';
import {
  createPendingPostRequestType,
  IPostRepository,
  updatePostStatusRequestType,
} from 'modules/post/domain/repositories';
import { AppError, catchErrorAsync } from 'utils/error-handling';

export class PostRepository implements IPostRepository {
  async createPendingPost(post: createPendingPostRequestType): Promise<Post> {
    const [error, newPost] = await catchErrorAsync(
      prisma.post.create({
        data: {
          phone: post.phone,
          propertyId: post.propertyId,
          socialLink: post.socialLink,
          status: PostStatus.PENDING,
          type: post.type,
          userId: post.userId,
        },
      })
    );
    if (error || !newPost)
      throw AppError.new(
        'internalErrorServer',
        'prisma error: while creating post'
      );
    return {
      ...newPost,
      status: newPost.status as PostStatus,
      type: newPost.type as PostType,
    };
  }
  async updatePostStatus(params: updatePostStatusRequestType): Promise<Post> {
    const updatedPost = await prisma.post.update({
      data: {
        adminId: params.approvingAdminId,
        status: params.status,
      },
      where: { id: params.postId },
    });
    console.log(updatedPost, '<====');
    if (!updatedPost) {
      throw new Error('Post not found');
    }
    return {
      ...updatedPost,
      status: updatedPost.status as PostStatus,
      type: updatedPost.type as PostType,
    };
  }
}
