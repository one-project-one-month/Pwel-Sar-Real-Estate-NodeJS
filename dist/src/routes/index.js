"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const error_handling_1 = require("utils/error-handling");
const userRouter_1 = __importDefault(require("./userRouter"));
const ownerRoute_1 = __importDefault(require("./ownerRoute"));
const router = (0, express_1.Router)();
router.get("/healthCheck", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    next(error_handling_1.AppError.new(error_handling_1.errorKinds.internalServerError, "internal Server Error"));
}));
//register route
router.use('/users', userRouter_1.default);
router.use('/owner', ownerRoute_1.default);
//404 handler
router.use((req, res, next) => {
    // send 404 error
    return next(error_handling_1.AppError.new(error_handling_1.errorKinds.notFound, "Not Found"));
});
// error handling
router.use((err, req, res, next) => {
    if (err instanceof error_handling_1.AppError) {
        res.status(err.getStatus()).json({
            message: err.message,
            payload: err.payload
        }).end();
    }
});
exports.default = router;
