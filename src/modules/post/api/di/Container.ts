import { IPostRepositories } from 'modules/post/domain/repositories/IPostRepository';
import { IPorpertyPhotoRepository } from 'modules/post/domain/repositories/IPropertyPhotoRepository';
import { IPropertyRepository } from 'modules/post/domain/repositories/IPropertyRepository';
import { PostRepositories } from 'modules/post/infrastructure/repositories/PostRepository';
import { PropertyPhotoRepository } from 'modules/post/infrastructure/repositories/PropertyPhotoRepository';
import { PropertyRepository } from 'modules/post/infrastructure/repositories/PropertyRepository';

export class Container {
  static postRepository: IPostRepositories = new PostRepositories();
  static propertyRepository: IPropertyRepository = new PropertyRepository();
  static propertyPhotoRepository: IPorpertyPhotoRepository = new PropertyPhotoRepository();
}
