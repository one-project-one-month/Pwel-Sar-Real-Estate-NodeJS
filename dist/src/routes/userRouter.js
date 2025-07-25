"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UsersController_1 = __importDefault(require("modules/user/api/controllers/UsersController"));
const userRouter = (0, express_1.Router)();
userRouter.get("/", UsersController_1.default.getAll);
exports.default = userRouter;
