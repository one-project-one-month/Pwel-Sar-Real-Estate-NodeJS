
export interface IPorpertyPhotoParams{
    id: number,
    path: string,
    propertyId: number,
    property?: any
}

export class PropertyPhoto{
    id: number;
    path: string;
    propertyId: number;
    property?: any

    constructor(params: IPorpertyPhotoParams){
        this.id = params.id
        this.path = params.path
        this.propertyId = params.propertyId
        this.property = params.property
    }
}