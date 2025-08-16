import { prisma } from "libs/prismaClients";
import { PropertyPhoto } from "modules/post/domain/entities/PropertyPhoto.entity";
import { IPorpertyPhotoRepository } from "modules/post/domain/repositories/IPropertyPhotoRepository";

export class PropertyPhotoRepository implements IPorpertyPhotoRepository {
    async createMany(params: any): Promise<PropertyPhoto[]> {
        await prisma.propertyPhoto.createMany({ data: params });
        // Fetch the photos back (assumes all have same propertyId)
        const propertyId = params[0].propertyId;

        const createdPhotos = await prisma.propertyPhoto.findMany({
            where: { propertyId },
            orderBy: { id: 'desc' },
            take: params.length,
        });

        return createdPhotos.map((p) => new PropertyPhoto(p));

    }

    async delete(id: number): Promise<void> {
        await prisma.propertyPhoto.delete({ where: { id } });
    }

}