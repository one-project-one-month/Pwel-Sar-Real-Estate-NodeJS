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
    propertyTypeId: number;
    region: string;
    street: string;
    township: string;
    width: number;
  };
}

export interface IPostRepository {
  createPostAndProperty(
    params: CreatePostAndPropertyRequestType
  ): Promise<{ post: Post; property: Property }>;
  updatePostStatus(params: updatePostStatusRequestType): Promise<Post>;
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
