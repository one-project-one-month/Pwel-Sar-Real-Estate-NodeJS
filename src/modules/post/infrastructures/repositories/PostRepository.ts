/* eslint-disable perfectionist/sort-objects */
import { prisma } from 'libs/prismaClients';
import { PostFilterDTO } from 'modules/post/application/dtos/PostFilterDTO';
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
import { formatDate } from 'utils/formatDate';
import { amountToCents, centsToMMK, centsToNumber } from 'utils/mmkUtils';

export class PostRepository implements IPostRepository {
  async createPostAndProperty(
    params: CreatePostAndPropertyRequestType
  ): Promise<{ post: Post; property: Property }> {
    // Convert price to cents for DB
    const priceInCents = amountToCents(params.property.price);
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

          // console.log('Created post:', createdPost);
          // 2. Create the property with postId set to the new post's id
          const createdProperty = await tx.property.create({
            data: {
              // bathRoom: params.property.bathRoom,
              // bedRoom: params.property.bedRoom,
              // buildingNumber: params.property.buildingNumber,
              // currency: params.property.currency,
              // floor: params.property.floor,
              // latitude: params.property.latitude,
              // length: params.property.length,
              // longitude: params.property.longitude,
              // ownerId: params.property.ownerId,
              // postId: createdPost.id,
              // price: priceInCents,
              // propertyTypeId: params.property.propertyTypeId,
              // region: params.property.region,
              // street: params.property.street,
              // township: params.property.township,
              // width: params.property.width,
              ...params.property,
              postId: createdPost.id,
              price: priceInCents,
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
        property: new Property({
          ...result!.property,
          price: centsToNumber(result.property.price),
        }),
      };
    } catch (error) {
      console.error('Prisma error:', error); // Log the real Prisma error
      throw AppError.new(
        errorKinds.internalServerError,
        'prisma error: while creating post and property from Repository'
      );
    }
  }

  async findAllWithFilters(filters: PostFilterDTO): Promise<any> {
    const {
      cursor,
      maxPrice,
      minPrice,
      postType,
      propertyType,
      region,
      search,
      take = 10,
      township,
      street,
    } = filters;
    const limit = Number(take);

    // Build property filter
    const propertyFilter: any = {
      ...(region && { region: { contains: region, mode: 'insensitive' } }),
      ...(township && {
        township: { contains: township, mode: 'insensitive' },
      }),
      ...(street && { street: { contains: street, mode: 'insensitive' } }),
      ...(propertyType && { propertyType: { name: propertyType } }),
      ...((minPrice !== undefined || maxPrice !== undefined) && {
        price: {
          ...(minPrice !== undefined
            ? { gte: BigInt(amountToCents(minPrice)) }
            : {}),
          ...(maxPrice !== undefined
            ? { lte: BigInt(amountToCents(maxPrice)) }
            : {}),
        },
      }),
    };

    // Build where clause
    const where: any = {
      ...(postType && { type: postType }),
      ...(Object.keys(propertyFilter).length > 0 && {
        property: propertyFilter,
      }),
      ...(search && {
        OR: [
          { property: { region: { contains: search, mode: 'insensitive' } } },
          { property: { township: { contains: search, mode: 'insensitive' } } },
          { property: { street: { contains: search, mode: 'insensitive' } } },
          {
            property: {
              buildingNumber: { contains: search, mode: 'insensitive' },
            },
          },
        ],
      }),
    };

    // Fetch one extra to check for next page
    // const posts = await prisma.post.findMany({
    //   cursor: cursor ? { id: Number(cursor) } : undefined,
    //   include: {
    //     property: true,
    //     user: true,
    //   },

    //   orderBy: { createdAt: 'desc' },
    //   skip: cursor ? 1 : 0,
    //   take: limit + 1,
    //   where,
    // });
    console.log('filters:', filters);
    console.log('propertyFilter:', JSON.stringify(propertyFilter, null, 2));
    console.log('WHERE for posts:', JSON.stringify(where, null, 2));

    const [errors, result] = await catchErrorAsync(
      prisma.$transaction([
        prisma.post.findMany({
          cursor: cursor ? { id: Number(cursor) } : undefined,
          include: {
            property: true,
            user: true,
          },
          orderBy: { createdAt: 'desc' },
          skip: cursor ? 1 : 0,
          take: limit + 1,
          where,
        }),
        prisma.post.count({ where }),
      ])
    );

    if (errors || !result) {
      throw AppError.new(
        'internalErrorServer',
        'prisma error: while getting all posts'
      );
    }

    const [rawPosts, total] = result;

    const mappedPosts = (rawPosts as any[]).map((post) => ({
      ...post,
      property: post.property
        ? {
            ...post.property,
            price: centsToNumber(post.property.price),
            priceDisplay: `${centsToMMK(Number(post.property.price))}`,
          }
        : undefined,
      user: {
        id: post.user.id,
        username: post.user.username,
        email: post.user.email,
      },
      createdAt: formatDate(post.createdAt.toString()),
    }));

    const hasNextPage = mappedPosts.length > limit;
    if (hasNextPage) {
      mappedPosts.pop();
    }
    const nextCursor =
      mappedPosts.length > 0 ? mappedPosts[mappedPosts.length - 1].id : null;

    return {
      currentTotalPage: mappedPosts.length,
      total,
      hasNextPage,
      nextCursor,
      posts: mappedPosts,
    };

    // const hasNextPage = posts.length > limit;
    // if (hasNextPage) {
    //   posts.pop(); // Remove the extra item
    // }

    // const nextCursor = posts.length > 0 ? posts[posts.length - 1].id : null;

    // Map to Post entity if needed, or return raw for now
    // const mappedPosts = posts.map(
    //   (post) =>
    //     new Post({
    //       ...post,
    //       status: PostStatus[post.status as keyof typeof PostStatus],
    //       type: PostType[post.type as keyof typeof PostType],
    //     })
    // );
    // const total = await prisma.post.count({ where });

    // return {
    //   currentTotalPage: mappedPosts.length,
    //   nextCursor,
    //   total,
    //   // eslint-disable-next-line perfectionist/sort-objects
    //   hasNextPage,

    //   posts: mappedPosts,
    // };
  }

  async findById(id: number) {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        property: true,
        user: true,
      },
    });
    if (!post) return null;
    const priceToNumber = centsToNumber(Number(post.property?.price));
    const priceToMMK = centsToMMK(Number(post.property?.price));
    return {
      ...post,
      user: {
        id: post.user.id,
        username: post.user.username,
        email: post.user.email,
      },
      createdAt: formatDate(post.createdAt.toString()),
      property: post.property
        ? {
            ...post.property,
            price: priceToNumber,
            priceDisplay: priceToMMK,
          }
        : undefined,
    };
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
