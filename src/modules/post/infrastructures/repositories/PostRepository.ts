import { prisma } from 'libs/prismaClients';
import { Post, PostStatus } from 'modules/post/domain/entities/Post.entity';
import {
  createPendingPostRequestType,
  createPendingPropertyRequestType,
  IPostRepository,
} from 'modules/post/domain/repositories';
import { AppError, catchErrorAsync } from 'utils/error-handling';

export class PostRepository implements IPostRepository {
  // original
  // async createPendingPost(post: createPendingPostRequestType): Promise<Post> {
  //   const [error, newPost] = await catchErrorAsync(
  //     prisma.post.create({
  //       data: {
  //         phone: post.phone,
  //         propertyId: post.propertyId,
  //         socialLink: post.socialLink,
  //         status: PostStatus.PENDING,
  //         type: post.type,
  //         userId: post.userId,
  //       },
  //     })
  //   );
  //   if (error || !newPost)
  //     throw AppError.new(
  //       'internalErrorServer',
  //       'prisma error: while creating post'
  //     );
  //   return {
  //     ...newPost,
  //     status: newPost.status as PostStatus,
  //     type: newPost.type as PostType,
  //   };
  // }
  // async updatePostStatus(params: updatePostStatusRequestType): Promise<Post> {
  //   const updatedPost = await prisma.post.update({
  //     data: {
  //       adminId: params.approvingAdminId,
  //       status: params.status,
  //     },
  //     where: { id: params.postId },
  //   });
  //   console.log(updatedPost, '<====');
  //   if (!updatedPost) {
  //     throw new Error('Post not found');
  //   }
  //   return {
  //     ...updatedPost,
  //     status: updatedPost.status as PostStatus,
  //     type: updatedPost.type as PostType,
  //   };
  // }

  // create a post using prisma $transaction

  async createPendingPost(
    post: createPendingPostRequestType,
    property: createPendingPropertyRequestType
  ): Promise<Post> {
    const [error, newPost] = await catchErrorAsync(
      prisma.$transaction(async (tx) => {
        const createPost = tx.post.create({
          data: {
            phone: post.phone,
            propertyId: post.propertyId,
            socialLink: post.socialLink,
            status: PostStatus.PENDING,
            type: post.type,
            userId: post.userId,
          },
        });

        const createProperty = tx.property.create({
          data: {
            bathRoom: property.bathRoom,
            bedRoom: property.bedRoom,
            buildingNumber: property.buildingNumber,
            currency: property.currency,
            floor: property.floor,
            latitude: property.latitude,
            length: property.length,
            longitude: property.longitude,
            ownerId: property.ownerId,
            propertyTypeId: property.propertyTypeId,
            region: property.region,
            street: property.street,
            township: property.township,
            width: property.width,
          },
        });

        return { createPost, createProperty };
      })
    );
    if (error || !newPost)
      throw AppError.new(
        'internalErrorServer',
        'prisma error: while creating post'
      );
    return {
      ...newPost.createPost,
      ...newPost.createProperty,
      property: newPost.createProperty,
      status: newPost.createPost.status,
      type: newPost.createPost,
    };
  }
}
