import { User } from 'modules/user/domain/entitiies/User.entity';
import {
  GetAllRequestType,
  GetUserListReturnType,
  IUserRepository,
} from 'modules/user/domain/repositories';
import { AppError, catchErrorAsync } from 'utils/error-handling';
import { PostRepositories } from 'modules/post/infrastructure/repositories/PostRepository';
import { PropertyRepository } from 'modules/post/infrastructure/repositories/PropertyRepository';
import {
  WishlistItemResponse,
  WishlistRespone,
} from '../../applications/dtos/WishlistDTO';

import { prisma } from '../../../../libs/prismaClients';

export class UserRepository implements IUserRepository {
  private postRepository: PostRepositories;
  private propertyRepository: PropertyRepository;

  constructor() {
    this.postRepository = new PostRepositories();
    this.propertyRepository = new PropertyRepository();
  }
  async create(data: any): Promise<User> {
    //:TODO change any
    const user = await prisma.user.create({ data });
    const newUser = new User({
      createdAt: user.createdAt,
      email: user.email,
      id: user.id,
      password: user.password,
      roleId: user.roleId,
      updatedAt: user.updatedAt,
      username: user.username,
    });
    return newUser;
  }

  async findById(id: number): Promise<User> {
    try {
      const user = await prisma.user.findUnique({ where: { id } });
      if (!user) {
        throw AppError.new('badRequest', 'user not found');
      }
      return new User({
        createdAt: user.createdAt,
        email: user.email,
        id: user.id,
        password: user.password,
        roleId: user.roleId,
        updatedAt: user.updatedAt,
        username: user.username,
      });
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      throw AppError.new(
        'internalErrorServer',
        'prisma error: while getting user by id'
      );
    }
  }

  async getAll(parmas: GetAllRequestType): Promise<GetUserListReturnType> {
    const { limit = 20, page = 0 } = parmas;
    const [errors, result] = await catchErrorAsync(
      prisma.$transaction([
        prisma.user.findMany({
          orderBy: { createdAt: 'desc' },
          skip: page * limit,
          take: limit,
          where: this.getListFilter(parmas),
        }),
        prisma.user.count({
          where: this.getListFilter(parmas),
        }),
      ])
    );

    console.log(errors);

    if (errors || !result)
      throw AppError.new(
        'internalErrorServer',
        'prisma error: while getting all users'
      );
    const [rawUsers, usersCount] = result;
    const users = rawUsers.map(
      (user) =>
        new User({
          createdAt: user.createdAt,
          email: user.email,
          id: user.id,
          password: user.password,
          roleId: user.roleId,
          updatedAt: user.updatedAt,
          username: user.username,
        })
    );
    return {
      totalCount: usersCount,
      users,
    };
  }

  async update(data: any): Promise<User> {
    //:TODO change any
    const user = await prisma.user.update({ data, where: { id: data.id } });
    const updatedUser = new User({
      createdAt: user.createdAt,
      email: user.email,
      id: user.id,
      password: user.password,
      roleId: user.roleId,
      updatedAt: user.updatedAt,
      username: user.username,
    });
    return updatedUser;
  }

  private getListFilter = (params: GetAllRequestType) => {
    const { searchBy, searchKeyword } = params;
    return searchBy
      ? {
          ...(searchBy === 'username'
            ? { username: { contains: searchKeyword } }
            : { [searchBy]: searchKeyword }),
        }
      : {};
  };

  async getWishlistByUserId(userId: number): Promise<WishlistRespone> {
    try {
      const rawWishlist = await prisma.wishlist.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
      });

      const wishlistWithDetails = await Promise.all(
        rawWishlist.map(async (wishlistItem) => {
          const post = await this.getPostWithDetails(wishlistItem.postId);

          return new WishlistItemResponse({
            id: wishlistItem.id,
            userId: wishlistItem.userId,
            postId: wishlistItem.postId,
            createdAt: wishlistItem.createdAt,
            post: post,
          });
        })
      );

      const userWishlist = new WishlistRespone(userId, wishlistWithDetails);
      return userWishlist;
    } catch (error) {
      throw AppError.new(
        'internalErrorServer',
        `Prisma error while getting wishlist by user id: ${error}`
      );
    }
  }

  private async getPostWithDetails(postId: number): Promise<any> {
    try {
      const post = await prisma.post.findUnique({
        where: { id: postId },
      });

      if (!post) {
        throw new Error(`Post with id ${postId} not found`);
      }
      const properties = await this.getPropertiesWithDetails(postId);

      return {
        id: post.id,
        description: post.description,
        userId: post.userId,
        status: post.status,
        adminId: post.adminId,
        phone: post.phone,
        socialLink: post.socialLink,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        type: post.type,
        property: properties,
      };
    } catch (error) {
      throw AppError.new(
        'internalErrorServer',
        `Error fetching post details: ${error}`
      );
    }
  }

  // TO-DO: improve type strictness and error handling
  private async getPropertiesWithDetails(postId: number): Promise<any[]> {
    try {
      const properties = await prisma.property.findMany({
        where: { postId },
        include: {
          propertyType: true,
          photos: true,
        },
      });

      return properties.map((property) => ({
        id: property.id,
        ownerId: property.ownerId,
        propertyTypeId: property.propertyTypeId,
        bedRoom: property.bedRoom,
        bathRoom: property.bathRoom,
        latitude: property.latitude,
        longitude: property.longitude,
        buildingNumber: property.buildingNumber,
        street: property.street,
        floor: property.floor,
        township: property.township,
        region: property.region,
        length: property.length,
        width: property.width,
        currency: property.currency,
        createdAt: property.createdAt,
        postId: property.postId,
        updatedAt: property.updatedAt,
        propertyType: {
          id: property.propertyType.id,
          name: property.propertyType.name,
        },
        photos: property.photos.map((photo) => ({
          id: photo.id,
          path: photo.path,
          propertyId: photo.propertyId,
        })),
      }));
    } catch (error) {
      throw AppError.new(
        'internalErrorServer',
        `Error fetching property details: ${error}`
      );
    }
  }
}
