import { prisma } from 'libs/prismaClients';
import {
  Post,
  PostStatus,
  PostType,
} from 'modules/post/domain/entities/Post.entity';
import {
  CreatePostAndPropertyRequestType,
  IPostRepository,
  updatePostStatusRequestType,
} from 'modules/post/domain/repositories/IPostRepository';
import { Property } from 'modules/property/domain/entities/Property.entity';
import { AppError, catchErrorAsync } from 'utils/error-handling';
import { errorKinds } from 'utils/error-handling';

export class PostRepository implements IPostRepository {
  async createPostAndProperty(
    params: CreatePostAndPropertyRequestType
  ): Promise<{ post: Post; property: Property }> {
    try {
      const [error, result] = await catchErrorAsync(
        prisma.$transaction(async (tx) => {
          // 1. Create the post first
          const createdPost = await tx.post.create({
            data: {
              // adminId: params.post.adminId ?? null,
              phone: params.post.phone,
              socialLink: params.post.socialLink,
              status: params.post.status ?? 'Pending',
              type: params.post.type,
              userId: params.post.userId,
            },
          });

          console.log('Created post:', createdPost);
          // 2. Create the property with postId set to the new post's id
          const createdProperty = await tx.property.create({
            data: {
              bathRoom: params.property.bathRoom,
              bedRoom: params.property.bedRoom,
              buildingNumber: params.property.buildingNumber,
              currency: params.property.currency,
              floor: params.property.floor,
              latitude: params.property.latitude,
              length: params.property.length,
              longitude: params.property.longitude,
              ownerId: params.property.ownerId,
              postId: createdPost.id,
              propertyTypeId: params.property.propertyTypeId,
              region: params.property.region,
              street: params.property.street,
              township: params.property.township,
              width: params.property.width,
            },
          });

          // console.log('Created property:', createdProperty);
          return { post: createdPost, property: createdProperty };
        })
      );
      if (error || !result) {
        console.error('Prisma error:', error);
        throw AppError.new(
          errorKinds.internalServerError,
          'prisma error: while creating post and property from Repository'
        );
      }
      return {
        post: new Post({
          ...result!.post,
          status: result!.post.status as PostStatus,
          type: result!.post.type as PostType,
        }),
        property: new Property(result!.property),
      };
    } catch (error) {
      console.error('Prisma error:', error); // Log the real Prisma error
      throw AppError.new(
        errorKinds.internalServerError,
        'prisma error: while creating post and property from Repository'
      );
    }
  }

  async updatePostStatus(params: updatePostStatusRequestType): Promise<Post> {
    const [error, updatedPost] = await catchErrorAsync(
      prisma.post.update({
        data: {
          adminId: params.approvingAdminId,
          status: params.status,
        },
        where: { id: params.postId },
      })
    );
    if (error || !updatedPost) {
      console.error('Prisma error:', error);
      throw AppError.new(
        'internalErrorServer',
        'prisma error: while updating post status'
      );
    }
    return new Post({
      ...updatedPost,
      status: updatedPost.status as PostStatus,
      type: updatedPost.type as PostType,
    });
  }
}
