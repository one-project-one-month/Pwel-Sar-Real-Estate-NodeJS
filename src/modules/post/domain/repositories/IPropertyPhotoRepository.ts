import { PropertyPhoto } from "../entities/PropertyPhoto.entity";

export interface IPorpertyPhotoRepository {
    createMany(data: any): Promise<PropertyPhoto[]>
}