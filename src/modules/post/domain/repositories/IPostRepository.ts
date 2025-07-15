import { Property } from 'modules/property/domain/entities/Property.entity';

import { Post, PostStatus, PostType } from '../entities/Post.entity';
/* eslint-disable no-unused-vars */
export interface createPendingPostRequestType {
  phone: string;
  property: Property;
  propertyId: number;
  socialLink: null | string;
  status?: PostStatus;
  type: PostType;
  userId: number;
}

export interface createPendingPropertyRequestType {
  bathRoom: number;
  bedRoom: number;
  buildingNumber: string; // Changed from Int to String
  createdAt: Date;
  currency: string; // Changed from Int to String (e.g., "USD")
  floor: number;
  latitude: string; // Consider using Float or Decimal
  length: number; // Fixed typo from "lenth"
  longitude: string; // Consider using Float or Decimal
  ownerId: number;
  phone?: string; // Optional field
  propertyTypeId: number;
  region: string;
  socialLink: string;
  status: string;
  street: string;
  township: string;
  width: number;
}

export interface IPostRepository {
  createPendingPost(
    params: createPendingPostRequestType,
    property: createPendingPropertyRequestType
  ): Promise<Post & Property>;
  updatePostStatus(params: updatePostStatusRequestType): Promise<Post>;
}

export interface postRegisterReturnType {
  post: Post;
}

export interface updatePostStatusRequestType {
  approvingAdminId: number;
  postId: number;
  status: PostStatus;
}
