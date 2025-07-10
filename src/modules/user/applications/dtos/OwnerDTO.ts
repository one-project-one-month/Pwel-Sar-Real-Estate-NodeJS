export class OwnerDTO{
    id: number;
    nrcNo: string;
    address: string;
    userId: number;

    username?: string;
    email?: string;

    constructor(owner: any){
        this.id = owner.id
        this.nrcNo = owner.nrcNo
        this.address = owner.address
        this.userId = owner.userId
        this.username = owner.username;
        this.email = owner.email;

    }
}