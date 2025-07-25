"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customEnvironment = void 0;
exports.customEnvironment = {
    PORT: process.env.PORT || 3000,
    DATABASE_URL: process.env.DATABASE_URL,
};
exports.default = exports.customEnvironment;
