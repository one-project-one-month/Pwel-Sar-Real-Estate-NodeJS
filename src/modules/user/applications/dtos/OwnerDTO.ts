export class OwnerDTO{
    id: number;
    nrcNo: string;
    address: string;
    userId: number;

    

    constructor(owner: any){
        this.id = owner.id
        this.nrcNo = owner.nrcNo
        this.address = owner.address
        this.userId = owner.userId
        

    }
}