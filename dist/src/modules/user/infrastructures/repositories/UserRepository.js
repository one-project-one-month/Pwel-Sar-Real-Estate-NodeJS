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
const error_handling_1 = require("utils/error-handling");
const prismaClients_1 = require("../../../../libs/prismaClients");
class UserRepository {
    constructor() {
        this.getListFilter = (params) => {
            const { searchBy, searchKeyword } = params;
            return searchBy
                ? Object.assign({}, (searchBy === 'username'
                    ? { username: { contains: searchKeyword } }
                    : { [searchBy]: searchKeyword })) : {};
        };
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            //:TODO change any
            const user = yield prismaClients_1.prisma.user.create({ data });
            const newUser = new User_entity_1.User({
                createdAt: user.createdAt,
                email: user.email,
                id: user.id,
                password: user.password,
                roleId: user.roleId,
                updatedAt: user.updatedAt,
                username: user.username,
            });
            return newUser;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield prismaClients_1.prisma.user.findUnique({ where: { id } });
                if (!user) {
                    throw error_handling_1.AppError.new('badRequest', 'user not found');
                }
                return new User_entity_1.User({
                    createdAt: user.createdAt,
                    email: user.email,
                    id: user.id,
                    password: user.password,
                    roleId: user.roleId,
                    updatedAt: user.updatedAt,
                    username: user.username,
                });
                // eslint-disable-next-line no-unused-vars
            }
            catch (error) {
                throw error_handling_1.AppError.new('internalErrorServer', 'prisma error: while getting user by id');
            }
        });
    }
    getAll(parmas) {
        return __awaiter(this, void 0, void 0, function* () {
            const { limit = 20, page = 0 } = parmas;
            const [errors, result] = yield (0, error_handling_1.catchErrorAsync)(prismaClients_1.prisma.$transaction([
                prismaClients_1.prisma.user.findMany({
                    orderBy: { createdAt: 'desc' },
                    skip: page * limit,
                    take: limit,
                    where: this.getListFilter(parmas),
                }),
                prismaClients_1.prisma.user.count({
                    where: this.getListFilter(parmas),
                }),
            ]));
            console.log(errors);
            if (errors || !result)
                throw error_handling_1.AppError.new('internalErrorServer', 'prisma error: while getting all users');
            const [rawUsers, usersCount] = result;
            const users = rawUsers.map((user) => new User_entity_1.User({
                createdAt: user.createdAt,
                email: user.email,
                id: user.id,
                password: user.password,
                roleId: user.roleId,
                updatedAt: user.updatedAt,
                username: user.username,
            }));
            return {
                totalCount: usersCount,
                users,
            };
        });
    }
    update(data) {
        return __awaiter(this, void 0, void 0, function* () {
            //:TODO change any
            const user = yield prismaClients_1.prisma.user.update({ data, where: { id: data.id } });
            const updatedUser = new User_entity_1.User({
                createdAt: user.createdAt,
                email: user.email,
                id: user.id,
                password: user.password,
                roleId: user.roleId,
                updatedAt: user.updatedAt,
                username: user.username,
            });
            return updatedUser;
        });
    }
}
exports.UserRepository = UserRepository;
