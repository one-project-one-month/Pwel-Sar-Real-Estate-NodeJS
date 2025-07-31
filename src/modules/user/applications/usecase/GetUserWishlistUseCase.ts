import { UserRepository } from 'modules/user/infrastructures/repositories/UserRepository';
import { WishlistRespone } from '../dtos/WishlistDTO';

export class GetUserWishlistUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: number): Promise<WishlistRespone> {
    const wishlist = await this.userRepository.getWishlistByUserId(userId);
    return wishlist;
  }
}
