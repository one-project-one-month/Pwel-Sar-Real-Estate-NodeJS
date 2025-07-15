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

export interface IPostRepository {
  createPendingPost(params: createPendingPostRequestType): Promise<Post>;
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
