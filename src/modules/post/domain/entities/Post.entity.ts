import { Property } from './Property.entity';

export enum PostStatus {
  // eslint-disable-next-line no-unused-vars
  Pending = 'Pending',
  // eslint-disable-next-line no-unused-vars
  Success = 'Success',
}

export enum PostType {
  // eslint-disable-next-line no-unused-vars
  Lease = 'Lease',
  // eslint-disable-next-line no-unused-vars
  Rent = 'Rent',
  // eslint-disable-next-line no-unused-vars
  Sale = 'Sale',
}

export interface IPost {
  adminId?: null | number;
  createdAt: Date;
  description: string;
  id: number;
  phone: string;
  property?: any;
  socialLink?: null | string;
  status: PostStatus;
  type: PostType;
  updatedAt: Date;
  userId: number;
}

export class Post {
  adminId?: null | number;
  createdAt: Date;
  description: string;
  id: number;
  phone: string;
  property?: Property | undefined;
  socialLink?: null | string;
  status: PostStatus;
  type: PostType;
  updatedAt: Date;
  userId: number;

  constructor(params: IPost) {
    this.adminId = params.adminId;
    this.description = params.description;
    this.id = params.id;
    this.phone = params.phone;
    this.socialLink = params.socialLink;
    this.status = params.status;
    this.type = params.type;
    this.userId = params.userId;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
    this.property = params.property;
  }
}
