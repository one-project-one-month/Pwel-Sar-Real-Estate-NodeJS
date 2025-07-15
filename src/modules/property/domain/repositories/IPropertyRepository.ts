/* eslint-disable no-unused-vars */

export interface createPropertyDataType {
  bathRoom: number;
  bedRoom: number;
  buildingNumber: string;
  currency: string;
  floor: number;
  latitude: string;
  length: number;
  longitude: string;
  ownerId: number;
  postId: number;
  propertyTypeId: number;
  region: string;
  street: string;
  township: string;
  width: number;
}

export interface IPropertyRepository {
  create: (data: createPropertyDataType) => Promise<createPropertyDataType>;
}
