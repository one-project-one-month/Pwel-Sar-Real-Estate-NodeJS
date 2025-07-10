/* eslint-disable no-unused-vars */
import { Property } from './Property.entity';

enum PostStatus {
  ACTIVE = 'active',
  PENDING = 'pending',
  RENTED = 'rented',
  SOLD = 'sold',
}

enum PostType {
  RENT = 'rent',
  SALE = 'sale',
}

interface IPost {
  adminId: null | number;
  createdAt: Date;
  id: number;
  phone: string;
  property?: Property;
  socialLink: null | string;
  status: PostStatus;
  type: PostType;
  userId: number;
}

export class Post {
  adminId?: null | number;
  createdAt: Date;
  id: number;
  phone: string;
  property?: Property;
  socialLink: null | string;
  status: PostStatus;
  type: PostType;
  userId: number;

  constructor(post: IPost) {
    this.adminId = post.adminId;
    this.createdAt = post.createdAt;
    this.id = post.id;
    this.phone = post.phone;
    this.property = post.property;
    this.socialLink = post.socialLink;
    this.status = post.status;
    this.type = post.type;
    this.userId = post.userId;
  }
}
