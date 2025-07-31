export interface IWishlist {
  id: number;
  userId: number;
  postId: number;
  createdAt: Date;
  updatedAt: Date;
}

export class Property {
  private wishlist: IWishlist;

  constructor(params: IWishlist) {
    this.wishlist = {
      id: params.id,
      userId: params.userId,
      postId: params.postId,
      createdAt: params.createdAt,
      updatedAt: params.updatedAt,
    };
  }
}
