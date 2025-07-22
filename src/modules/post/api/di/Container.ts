import { IPostRepositories } from 'modules/post/domain/repositories/IPostRepository';
import { IPropertyRepository } from 'modules/post/domain/repositories/IPropertyRepository';
import { PostRepositories } from 'modules/post/infrastructure/repositories/PostRepository';
import { PropertyRepository } from 'modules/post/infrastructure/repositories/PropertyRepository';

export class Container {
  static postRepository: IPostRepositories = new PostRepositories();
  static propertyRepository: IPropertyRepository = new PropertyRepository();
}
