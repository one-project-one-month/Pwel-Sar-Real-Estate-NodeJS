import { IProperty, Property } from '../entities/Property.entity';

export interface IPropertyRepository {
  // eslint-disable-next-line no-unused-vars
  create(data: IProperty): Promise<Property>;
  // eslint-disable-next-line no-unused-vars
  delete(id: number): Promise<void>;
}
