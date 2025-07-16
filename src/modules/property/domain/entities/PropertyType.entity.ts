import { Property } from './Property.entity';

export interface IPropertyType {
  id: number;
  name: string;
  properties: Property[];
}

export class PropertyType {
  id: number;
  name: string;
  properties: Property[];

  constructor(propertyTye: IPropertyType) {
    this.id = propertyTye.id;
    this.name = propertyTye.name;
    this.properties = propertyTye.properties;
  }
}
