"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserListParamSchema = void 0;
const zod_1 = require("zod");
exports.getUserListParamSchema = zod_1.z.object({
    page: zod_1.z.number().min(1).optional(),
    limit: zod_1.z.number().min(1).optional(),
    search: zod_1.z.string().optional().optional(),
    searchBy: zod_1.z.enum(['username', 'email']).optional(),
});
