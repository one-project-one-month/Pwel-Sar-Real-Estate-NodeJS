export interface OwnerParams {
  address: string;
  createdAt: Date;
  id: number;
  nrcNo: string;
  phone: string;
  updatedAt: Date;
  user?: any;
  userId: number;
}

export class Owner {
  address: string;
  createdAt: Date;
  id: number;
  nrcNo: string;
  phone: string;
  updatedAt: Date;
  user?: any;
  userId: number;

  constructor(params: OwnerParams) {
    this.id = params.id;
    this.nrcNo = params.nrcNo;
    this.address = params.address;
    this.userId = params.userId;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
    this.phone = params.phone;
    this.user = params.user;
  }
}
