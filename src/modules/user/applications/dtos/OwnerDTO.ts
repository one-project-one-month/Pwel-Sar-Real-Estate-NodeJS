export class OwnerDTO {
  address: string;
  id: number;
  nrcNo: string;
  user: any;

  constructor(owner: any) {
    this.id = owner.id;
    this.nrcNo = owner.nrcNo;
    this.address = owner.address;
    this.user = owner.user;
  }
}
