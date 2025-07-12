"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyOwner = void 0;
class PropertyOwner {
    constructor(params) {
        const { id, nrcNo, address, userId } = params;
        this.id = id;
        this.nrcNo = nrcNo;
        this.address = address;
        this.userId = userId;
        if (!nrcNo || !address) {
            throw new Error("All fields are required");
        }
    }
}
exports.PropertyOwner = PropertyOwner;
