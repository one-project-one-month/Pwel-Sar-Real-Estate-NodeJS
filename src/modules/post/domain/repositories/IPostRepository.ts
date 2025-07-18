import { PostFilterDTO } from 'modules/post/application/dtos/PostFilterDTO';
import { Property } from 'modules/property/domain/entities/Property.entity';

import { Post, PostStatus, PostType } from '../entities/Post.entity';

export interface CreatePostAndPropertyRequestType {
  post: {
    adminId?: null | number;
    phone: string;
    socialLink?: null | string;
    status?: PostStatus;
    type: PostType;
    userId: number;
  };
  property: {
    bathRoom: number;
    bedRoom: number;
    buildingNumber: string;
    currency: string;
    floor: number;
    latitude: string;
    length: number;
    longitude: string;
    ownerId: number;
    price: number;
    propertyTypeId: number;
    region: string;
    street: string;
    township: string;
    width: number;
  };
}

export interface IPostRepository {
  createPostAndProperty(
    // eslint-disable-next-line no-unused-vars
    _params: CreatePostAndPropertyRequestType
  ): Promise<{ post: Post; property: Property }>;
  // eslint-disable-next-line no-unused-vars
  findAllWithFilters(_filters: PostFilterDTO): Promise<Post[]>;
  // eslint-disable-next-line no-unused-vars
  updatePostStatus(_params: updatePostStatusRequestType): Promise<Post>;
}

export interface postRegisterReturnType {
  post: Post;
  property: Property;
}

export interface updatePostStatusRequestType {
  approvingAdminId: number;
  postId: number;
  status: PostStatus;
}
