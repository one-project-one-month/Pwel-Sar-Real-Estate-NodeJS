"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyOwnerRepository = void 0;
const prismaClients_1 = require("libs/prismaClients");
const OwnerDTO_1 = require("modules/user/applications/dtos/OwnerDTO");
const Owner_entity_1 = require("modules/user/domain/entitiies/Owner.entity");
const error_handling_1 = require("utils/error-handling");
class PropertyOwnerRepository {
    constructor() {
        this.getListFilter = (params) => {
            const { searchBy, searchKeyword } = params;
            if (!searchBy || !searchKeyword)
                return {};
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
        };
    }
    getAll(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page = 0, limit = 20 } = params;
            try {
                const ownerFilter = this.getListFilter(params);
                const [errors, result] = yield (0, error_handling_1.catchErrorAsync)(prismaClients_1.prisma.$transaction([
                    prismaClients_1.prisma.ownerProfile.findMany({
                        where: ownerFilter,
                        skip: page * limit,
                        take: limit,
                        orderBy: {},
                        include: {
                            user: true
                        }
                    }),
                    prismaClients_1.prisma.ownerProfile.count({
                        where: ownerFilter,
                    })
                ]));
                console.log(errors);
                if (errors || !result)
                    throw error_handling_1.AppError.new('internalErrorServer', "prisma error: while getting all users");
                const [rawOwners, ownersCount] = result;
                const owners = rawOwners.map(owner => {
                    var _a, _b;
                    return new OwnerDTO_1.OwnerDTO({
                        id: owner.id,
                        nrcNo: owner.nrcNo,
                        address: owner.address,
                        userId: owner.userId,
                        username: (_a = owner.user) === null || _a === void 0 ? void 0 : _a.username,
                        email: (_b = owner.user) === null || _b === void 0 ? void 0 : _b.email,
                    });
                });
                return {
                    owners,
                    totalCount: ownersCount
                };
            }
            catch (error) {
                console.log(error);
                throw error_handling_1.AppError.new('internalErrorServer', "prisma error: while getting all property owners");
            }
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const propertyOwner = yield prismaClients_1.prisma.ownerProfile.findUnique({ where: { id }, include: { user: true } });
                if (!propertyOwner) {
                    throw error_handling_1.AppError.new('badRequest', "Owner not found");
                }
                return new OwnerDTO_1.OwnerDTO({
                    'id': propertyOwner.id,
                    'nrcNo': propertyOwner.nrcNo,
                    'address': propertyOwner.address,
                    'userId': propertyOwner.userId,
                    'username': (_a = propertyOwner.user) === null || _a === void 0 ? void 0 : _a.username,
                    'email': (_b = propertyOwner.user) === null || _b === void 0 ? void 0 : _b.email,
                });
            }
            catch (error) {
                console.log(error);
                throw error_handling_1.AppError.new('internalErrorServer', "prisma error: while getting property owner by id");
            }
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const propertyOwner = yield prismaClients_1.prisma.ownerProfile.create({
                    data: {
                        nrcNo: data.nrcNo,
                        address: data.address,
                        userId: data.userId
                    }
                });
                const newOwner = new Owner_entity_1.PropertyOwner({
                    'id': propertyOwner.id,
                    'nrcNo': propertyOwner.nrcNo,
                    'address': propertyOwner.address,
                    'userId': propertyOwner.userId
                });
                return newOwner;
            }
            catch (error) {
                console.log(error);
                throw error_handling_1.AppError.new('internalErrorServer', "prisma error: while creating property owner profile");
            }
        });
    }
}
exports.PropertyOwnerRepository = PropertyOwnerRepository;
