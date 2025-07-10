"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDTO = void 0;
class UserDTO {
    constructor(user) {
        this.id = user.id;
        this.username = user.username;
        this.email = user.email;
        this.roleId = user.roleId;
        this.createdAt = user.createdAt;
        this.updatedAt = user.updatedAt;
    }
}
exports.UserDTO = UserDTO;
