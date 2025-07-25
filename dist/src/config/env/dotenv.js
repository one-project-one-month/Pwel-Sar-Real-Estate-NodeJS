"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mode = ((_a = process.argv.find((arg) => arg.startsWith("--mode="))) === null || _a === void 0 ? void 0 : _a.split("=")[1]) ||
    "development";
dotenv_1.default.config({
    path: `.env.${mode}`,
});
