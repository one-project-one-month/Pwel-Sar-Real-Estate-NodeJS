export interface IProperty {
  bathRoom: number;
  bedRoom: number;
  buildingNumber: string;
  createdAt: Date;
  currency: number;
  floor?: null | number;
  id: number;
  latitude: string;
  length: number;
  longitude: string;
  ownerId: number;
  postId: number;
  propertyTypeId: number;
  region: string;
  street: string;
  township: string;
  updatedAt: Date;
  width: number;
}

export class Property {
  bathRoom: number;
  bedRoom: number;
  buildingNumber: string;
  createdAt: Date;
  currency: number;
  floor?: null | number;
  id: number;
  latitude: string;
  length: number;
  longitude: string;
  ownerId: number;
  postId: number;
  propertyTypeId: number;
  region: string;
  street: string;
  township: string;
  updatedAt: Date;
  width: number;

  constructor(params: IProperty) {
    this.id = params.id;
    this.bedRoom = params.bedRoom;
    this.bathRoom = params.bathRoom;
    this.width = params.width;
    this.length = params.length;
    this.latitude = params.latitude;
    this.longitude = params.longitude;
    this.buildingNumber = params.buildingNumber;
    this.street = params.street;
    this.floor = params.floor;
    this.township = params.township;
    this.region = params.region;
    this.currency = params.currency;
    this.propertyTypeId = params.propertyTypeId;
    this.ownerId = params.ownerId;
    this.postId = params.postId;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
  }

  getAddress(): string {
    return `No. ${this.buildingNumber}, ${
      this.floor && `${this.floor} Floor`
    }, ${this.street} Street, ${this.township} Township, ${this.region}`;
  }

  getArea(): number {
    return this.width * this.length;
  }
}
