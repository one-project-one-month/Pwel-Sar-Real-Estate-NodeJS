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
exports.UserRepository = void 0;
const User_entity_1 = require("modules/user/domain/entitiies/User.entity");
const prismaClients_1 = require("../../../../libs/prismaClients");
const error_handling_1 = require("utils/error-handling");
class UserRepository {
    constructor() {
        this.getListFilter = (params) => {
            const { searchBy, searchKeyword } = params;
            return searchBy
                ? Object.assign({}, (searchBy === 'username' ?
                    { username: { contains: searchKeyword } } :
                    { [searchBy]: searchKeyword })) : {};
        };
    }
    getAll(parmas) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page = 0, limit = 20 } = parmas;
            const [errors, result] = yield (0, error_handling_1.catchErrorAsync)(prismaClients_1.prisma.$transaction([
                prismaClients_1.prisma.user.findMany({
                    where: this.getListFilter(parmas),
                    skip: page * limit,
                    take: limit,
                    orderBy: { createdAt: 'desc' }
                }),
                prismaClients_1.prisma.user.count({
                    where: this.getListFilter(parmas),
                })
            ]));
            console.log(errors);
            if (errors || !result)
                throw error_handling_1.AppError.new('internalErrorServer', "prisma error: while getting all users");
            const [rawUsers, usersCount] = result;
            const users = rawUsers.map(user => new User_entity_1.User({
                'id': user.id,
                'email': user.email,
                'password': user.password,
                'username': user.username,
                'roleId': user.roleId,
                'createdAt': user.createdAt,
                'updatedAt': user.updatedAt
            }));
            return {
                users,
                totalCount: usersCount
            };
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield prismaClients_1.prisma.user.findUnique({ where: { id } });
                if (!user) {
                    throw error_handling_1.AppError.new('badRequest', "user not found");
                }
                return new User_entity_1.User({
                    'id': user.id,
                    'email': user.email,
                    'password': user.password,
                    'username': user.username,
                    'roleId': user.roleId,
                    'createdAt': user.createdAt,
                    'updatedAt': user.updatedAt
                });
            }
            catch (error) {
                throw error_handling_1.AppError.new('internalErrorServer', "prisma error: while getting user by id");
            }
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prismaClients_1.prisma.user.create({ data });
            const newUser = new User_entity_1.User({
                'id': user.id,
                'email': user.email,
                'password': user.password,
                'username': user.username,
                'roleId': user.roleId,
                'createdAt': user.createdAt,
                'updatedAt': user.updatedAt
            });
            return newUser;
        });
    }
    update(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prismaClients_1.prisma.user.update({ where: { id: data.id }, data });
            const updatedUser = new User_entity_1.User({
                'id': user.id,
                'email': user.email,
                'password': user.password,
                'username': user.username,
                'roleId': user.roleId,
                'createdAt': user.createdAt,
                'updatedAt': user.updatedAt
            });
            return updatedUser;
        });
    }
}
exports.UserRepository = UserRepository;
