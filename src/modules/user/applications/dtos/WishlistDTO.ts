import { PostStatus, PostType } from '../../../../../generated/prisma';

interface IPropertyPhotoResponse {
  id: number;
  path: string;
  propertyId: number;
}

interface IPropertyTypeResponse {
  id: number;
  name: string;
}

interface IPropertyResponse {
  id: number;
  ownerId: number;
  propertyTypeId: number;
  bedRoom: number;
  bathRoom: number;
  latitude: string;
  longitude: string;
  buildingNumber: string;
  street: string;
  floor?: number;
  township: string;
  region: string;
  length: number;
  width: number;
  currency: number;
  createdAt: Date;
  postId: number;
  updatedAt: Date;
  propertyType: IPropertyTypeResponse;
  photos: IPropertyPhotoResponse[];
}

interface IPostResponse {
  id: number;
  description: string;
  userId: number;
  status: PostStatus;
  adminId?: number;
  phone: string;
  socialLink?: string;
  createdAt: Date;
  updatedAt: Date;
  type: PostType;
  property: IPropertyResponse;
}

interface IWishlistItemResponse {
  id: number;
  userId: number;
  postId: number;
  createdAt: Date;
  post: IPostResponse;
}

export class WishlistItemResponse {
  id: number;
  postId: number;
  createdAt: Date;
  posts: IPostResponse;

  constructor(wishlist: IWishlistItemResponse) {
    this.id = wishlist.id;
    this.postId = wishlist.postId;
    this.createdAt = wishlist.createdAt;
    this.posts = wishlist.post;
  }
}

export class WishlistRespone {
  userId: number;
  items: WishlistItemResponse[];

  constructor(userId: number, items: WishlistItemResponse[]) {
    this.userId = userId;
    this.items = items;
  }
}
