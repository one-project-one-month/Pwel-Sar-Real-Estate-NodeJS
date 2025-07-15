import {
  Post,
  PostStatus,
  PostType,
} from 'modules/post/domain/entities/Post.entity';
import { Property } from 'modules/property/domain/entities/Property.entity';

export class PostDTO {
  adminId?: null | number;
  createdAt: Date;
  id: number;
  phone: string;
  property?: Property;
  socialLink: null | string;
  status: PostStatus;
  type: PostType;
  userId: number;

  constructor(post: Post) {
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
