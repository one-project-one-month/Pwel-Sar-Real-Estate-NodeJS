export class PostDTO {
  adminId: number;
  createdAt: Date;
  description: string;
  id: number;
  phone: string;
  property?: any;
  socialLink?: string;
  status: string;
  type: string;
  updatedAt: Date;
  userId: number;

  constructor(post: any) {
    this.id = post.id;
    this.description = post.description;
    this.phone = post.phone;
    this.status = post.status;
    this.userId = post.userId;
    this.adminId = post.adminId;
    this.type = post.type;
    this.socialLink = post.socialLink;
    this.createdAt = post.createdAt;
    this.updatedAt = post.updatedAt;
    this.property = post.property;
  }
}
