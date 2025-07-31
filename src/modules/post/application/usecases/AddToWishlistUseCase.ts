import { IPostRepositories } from 'modules/post/domain/repositories/IPostRepository';
import { Wishlist } from '../../../../../generated/prisma';

export class AddToWishlistUseCase {
  constructor(private readonly postRepository: IPostRepositories) {}

  async execute(data: { postId: number; userId: number }): Promise<Wishlist> {
    const insertedWishlist = await this.postRepository.addToWishList(data);
    if (!insertedWishlist) {
      throw new Error('Failed to add post to wishlist');
    }
    return insertedWishlist;
  }
}
