

export type PropertyOwnerParams = {
  
    id?: number;
    nrcNo: string;
    address: string;
    userId: number;
    status?: string;
}

export class PropertyOwner {
    id?: number;
    nrcNo: string;
    address: string;
    userId: number;
    status?: string;

    constructor(params: PropertyOwnerParams){
        const {id, nrcNo,  address, userId, status} = params
        this.id = id
        this.nrcNo = nrcNo
        this.address = address
        this.userId = userId
        this.status = status

        if(!nrcNo || !address ){
            throw new Error("All fields are required")
        }
    }
}