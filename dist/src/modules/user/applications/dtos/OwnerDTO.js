"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OwnerDTO = void 0;
class OwnerDTO {
    constructor(owner) {
        this.id = owner.id;
        this.nrcNo = owner.nrcNo;
        this.address = owner.address;
        this.user = owner.user;
    }
}
exports.OwnerDTO = OwnerDTO;
