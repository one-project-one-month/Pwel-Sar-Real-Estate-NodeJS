import { prisma } from "libs/prismaClients";
import { OwnerDTO } from "modules/user/applications/dtos/OwnerDTO";
import { PropertyOwner, PropertyOwnerParams } from "modules/user/domain/entitiies/Owner.entity";
import { GetAllOwnerRequestType, GetOwnerListReturnType, IPropertyOwnerRepository } from "modules/user/domain/repositories/IOwnerRepository";
import { AppError, catchErrorAsync } from "utils/error-handling";

export class PropertyOwnerRepository implements IPropertyOwnerRepository {

    private getListFilter = (params: GetAllOwnerRequestType) => {
        const { searchBy, searchKeyword } = params
        if (!searchBy || !searchKeyword) return {};

        if (searchBy === "username") {
            return {
                user: {
                    is: {
                        username: {
                            contains: searchKeyword,
                        }
                    }
                }
            };
        }
        else if (searchBy === "address") {
            return {
                address: {
                    contains: searchKeyword,
                },
            };
        }
        return {};
    }




    async getAll(params: GetAllOwnerRequestType): Promise<GetOwnerListReturnType> {

        const { page = 0, limit = 20 } = params

        try {
            const ownerFilter = this.getListFilter(params)
            const [errors, result] = await catchErrorAsync(prisma.$transaction([
                prisma.ownerProfile.findMany({
                    where: ownerFilter,
                    skip: page * limit,
                    take: limit,
                    orderBy: {},
                    include: {
                        user: true
                    }
                }),
                prisma.ownerProfile.count({
                    where: ownerFilter,
                })
            ]))

            console.log(errors)
            if (errors || !result) throw AppError.new('internalErrorServer', "prisma error: while getting all users")

            const [rawOwners, ownersCount] = result;

            const owners = rawOwners.map(owner => new OwnerDTO({
                id: owner.id,
                nrcNo: owner.nrcNo,
                address: owner.address,
                userId: owner.userId,
                username: owner.user?.username,
                email: owner.user?.email,
                status: owner.status
            }));
            return {
                owners,
                totalCount: ownersCount
            }


        } catch (error) {
            console.log(error);
            throw AppError.new('internalErrorServer', "prisma error: while getting all property owners")
        }
    }

    async findById(id: number): Promise<OwnerDTO> {
        try {
            const propertyOwner = await prisma.ownerProfile.findUnique({ where: { id }, include: { user: true } })

            if (!propertyOwner) {
                throw AppError.new('badRequest', "Owner not found")
            }
            return new OwnerDTO({
                'id': propertyOwner.id,
                'nrcNo': propertyOwner.nrcNo,
                'address': propertyOwner.address,
                'userId': propertyOwner.userId,
                'username': propertyOwner.user?.username,
                'email': propertyOwner.user?.email,
                'status': propertyOwner.status
            })
        } catch (error) {
            console.log(error);
            throw AppError.new('internalErrorServer', "prisma error: while getting property owner by id")
        }
    }

    async create(data: PropertyOwnerParams): Promise<PropertyOwner> {
        try {



            await prisma.ownerProfile.deleteMany({
                where: { userId: data.userId, status: "Rejected" }
            });


            const propertyOwner = await prisma.ownerProfile.create({
                data: {
                    nrcNo: data.nrcNo,
                    address: data.address,
                    userId: data.userId
                }
            })
            const newOwner = new PropertyOwner({
                'id': propertyOwner.id,
                'nrcNo': propertyOwner.nrcNo,
                'address': propertyOwner.address,
                'userId': propertyOwner.userId,
                'status': propertyOwner.status
            })
            return newOwner
        } catch (error) {
            console.log(error);
            throw AppError.new('internalErrorServer', "prisma error: while creating property owner profile")
        }
    }

    async approve(id: number): Promise<OwnerDTO> {
        try {
            const updateOwner = await prisma.ownerProfile.update({
                where: { id },
                data: { status: "Approved" }
            })
            return new OwnerDTO(updateOwner)
        } catch (error) {
            console.log(error);
            throw AppError.new('internalErrorServer', "prisma error:while getting property owner by id")
        }
    }

    async reject(id: number): Promise<OwnerDTO> {
        try {
            const updateOwner = await prisma.ownerProfile.update({
                where: { id },
                data: { status: "Rejected" }
            })
            return new OwnerDTO(updateOwner)
        } catch (error) {
            console.log(error);
            throw AppError.new('internalErrorServer', "prisma error:while getting property owner by id")
        }
    }

    async deleteById(id: number): Promise<OwnerDTO> {
        try {
            const deleted = await prisma.ownerProfile.delete({ where: { id } })
            return new OwnerDTO(deleted)
        } catch (error) {
            console.log(error);
            throw AppError.new('internalErrorServer', "prisma error:while deleting property owner by id")
        }
    }
}
