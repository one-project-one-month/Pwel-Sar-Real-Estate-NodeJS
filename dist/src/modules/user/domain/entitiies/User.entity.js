"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const error_handling_1 = require("utils/error-handling");
class User {
    constructor({ id, username, email, password, roleId, createdAt, updatedAt }) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.roleId = roleId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    isAdmin() {
        return this.roleId === 1; //:TODO 
    }
    chanageRole(roleId) {
        const isAdminAlready = true; //:TODO check admin
        if (isAdminAlready) {
            throw error_handling_1.AppError.new('forbidden', "you can't change role");
        }
        this.roleId = roleId;
    }
}
exports.User = User;
