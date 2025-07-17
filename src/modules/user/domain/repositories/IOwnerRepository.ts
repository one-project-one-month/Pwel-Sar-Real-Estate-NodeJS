import { PropertyOwner, PropertyOwnerParams } from "../entitiies/Owner.entity"

export type GetAllOwnerRequestType = {
    page: number,
    limit?: number,
    searchBy?: string,
    searchKeyword: string
}

export type GetOwnerListReturnType = {
    owners: PropertyOwner[],
    totalCount: number
}

export interface IPropertyOwnerRepository {
    getAll: (params: GetAllOwnerRequestType) => Promise<GetOwnerListReturnType>
    findById: (id: number) => Promise<PropertyOwner>
    create: (data: PropertyOwnerParams) => Promise<PropertyOwner>
    approve: (id: number) => Promise<PropertyOwner>
    reject: (id: number) => Promise<PropertyOwner>
    deleteById: (id: number) => Promise<PropertyOwner>
}