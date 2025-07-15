export interface IProperty {
  bathRoom: number;
  bedRoom: number;
  buildingNumber: string;
  currency: string;
  floor: number;
  id: number;
  latitude: string;
  length: number;
  longitude: string;
  ownerId: number;
  postId: number;
  propertyTypeId: number; /// changed type to id
  region: string;
  street: string;
  township: string;
  width: number;
}

export class Property {
  bathRoom: number;
  bedRoom: number;
  buildingNumber: string;
  currency: string;
  floor: number;
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
  width: number;

  constructor(Property: IProperty) {
    this.bathRoom = Property.bathRoom;
    this.bedRoom = Property.bedRoom;
    this.buildingNumber = Property.buildingNumber;
    this.currency = Property.currency;
    this.floor = Property.floor;
    this.id = Property.id;
    this.latitude = Property.latitude;
    this.length = Property.length;
    this.longitude = Property.longitude;
    this.ownerId = Property.ownerId;
    this.postId = Property.postId;
    this.propertyTypeId = Property.propertyTypeId;
    this.region = Property.region;
    this.street = Property.street;
    this.township = Property.township;
    this.width = Property.width;
  }

  getAddress(): string {
    const address = `No: ${this.buildingNumber}, ${this.street}, ${this.township}, ${this.region}`;

    return address;
  }

  getArea(): number {
    const area = this.width * this.length;

    return area;
  }
}
