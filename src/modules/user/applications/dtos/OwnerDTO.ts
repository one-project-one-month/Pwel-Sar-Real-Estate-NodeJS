export class OwnerDTO{
    id: number;
    nrcNo: string;
    address: string;
    userId: number;
    username?: string; 
    email?: string;
    status?: string;
    

    constructor(owner: any){
        this.id = owner.id
        this.nrcNo = owner.nrcNo
        this.address = owner.address
        this.userId = owner.userId
        this.username = owner.username ?? owner.user?.username;
        this.email = owner.email ?? owner.user?.email;
        this.status = owner.status;

    }
}