"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PropertyController_1 = __importDefault(require("modules/user/api/controllers/PropertyController"));
const ownerRoute = (0, express_1.Router)();
ownerRoute.get('/', PropertyController_1.default.getAll);
ownerRoute.get('/:id', PropertyController_1.default.findById);
ownerRoute.post('/create', PropertyController_1.default.create);
exports.default = ownerRoute;
