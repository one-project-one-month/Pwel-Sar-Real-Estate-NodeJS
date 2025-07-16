/* eslint-disable no-unused-vars */
import { Property } from '../../../property/domain/entities/Property.entity';

export enum PostStatus {
  Active = 'Active',
  Pending = 'Pending',
  Rented = 'Rented',
  Sold = 'Sold',
}

export enum PostType {
  Lease = 'Lease',
  Rent = 'Rent',
  Sale = 'Sale',
}

interface IPost {
  adminId: null | number;
  createdAt: Date;
  id: number;
  phone: string;
  property?: Property; // 1-to-1 relation, optional for construction
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
  property?: Property; // 1-to-1 relation
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
