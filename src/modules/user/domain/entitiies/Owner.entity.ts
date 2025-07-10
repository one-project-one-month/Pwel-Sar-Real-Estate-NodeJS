

export type PropertyOwnerParams = {
  
    id?: number;
    nrcNo: string;
    address: string;
    userId: number;
}

export class PropertyOwner {
    id?: number;
    nrcNo: string;
    address: string;
    userId: number;

    constructor(params: PropertyOwnerParams){
        const {id, nrcNo,  address, userId} = params
        this.id = id
        this.nrcNo = nrcNo
        this.address = address
        this.userId = userId

        if(!nrcNo || !address ){
            throw new Error("All fields are required")
        }
    }
}