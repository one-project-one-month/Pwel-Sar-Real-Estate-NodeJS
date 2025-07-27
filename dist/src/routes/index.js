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
const checkPermissionMIddleware_1 = require("modules/user/api/middlewares/checkPermissionMIddleware");
const error_handling_1 = require("utils/error-handling");
const agentRouter_1 = __importDefault(require("./agentRouter"));
const authRouter_1 = __importDefault(require("./authRouter"));
const ownerRouter_1 = __importDefault(require("./ownerRouter"));
const postRouter_1 = __importDefault(require("./postRouter"));
const userRouter_1 = __importDefault(require("./userRouter"));
const router = (0, express_1.Router)();
router.get('/healthCheck', (0, checkPermissionMIddleware_1.checkPermissionMiddleware)({ action: 'edit', resource: 'property' }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.sendStatus(200);
}));
//register route
router.use('/owners', ownerRouter_1.default);
router.use('/users', userRouter_1.default);
router.use('/auth', authRouter_1.default);
router.use('/agent-profiles', agentRouter_1.default);
router.use('/posts', postRouter_1.default);
//404 handler
router.use((req, res, next) => {
    // send 404 error
    return next(error_handling_1.AppError.new(error_handling_1.errorKinds.notFound, 'Not Found'));
    // send 404 error
});
// error handling
// eslint-disable-next-line no-unused-vars
router.use((err, req, res, next) => {
    if (err instanceof error_handling_1.AppError) {
        res
            .status(err.getStatus())
            .json({
            message: err.message,
            payload: err.payload,
        })
            .end();
    }
});
exports.default = router;
