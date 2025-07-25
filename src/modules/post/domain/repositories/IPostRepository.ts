import { IPost, Post } from '../entities/Post.entity';

export interface IPostRepositories {
  // eslint-disable-next-line no-unused-vars
  createPending(data: IPost): Promise<Post>;

  // eslint-disable-next-line no-unused-vars
  deletePost(id: number): Promise<any>;

  // eslint-disable-next-line no-unused-vars
  findPostById(id: number): Promise<Post>;

  getAllPosts(): Promise<Post[]>;

  // eslint-disable-next-line no-unused-vars
  verifyPost(data: any): Promise<Post>;
}
