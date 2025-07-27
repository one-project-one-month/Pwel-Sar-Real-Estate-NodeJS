"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Owner = void 0;
class Owner {
    constructor(params) {
        this.id = params.id;
        this.nrcNo = params.nrcNo;
        this.address = params.address;
        this.userId = params.userId;
        this.createdAt = params.createdAt;
        this.updatedAt = params.updatedAt;
        this.phone = params.phone;
        this.user = params.user;
    }
}
exports.Owner = Owner;
