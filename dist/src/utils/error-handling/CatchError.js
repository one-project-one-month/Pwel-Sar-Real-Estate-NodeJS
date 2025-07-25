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
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryAndThrow = exports.catchError = exports.catchErrorAsync = void 0;
const catchErrorAsync = (promise, ErrorInstance) => {
    return promise
        .then((data) => [undefined, data])
        .catch((err) => {
        if (ErrorInstance === undefined)
            return [err];
        if (ErrorInstance.some((errorinstance) => err instanceof errorinstance))
            return [err];
        if (err instanceof Error)
            return [err];
        throw err;
    });
};
exports.catchErrorAsync = catchErrorAsync;
const catchError = (fn, ErrorInstance) => {
    try {
        return [undefined, fn()];
    }
    catch (err) {
        if (ErrorInstance === undefined)
            return [err];
        if (ErrorInstance.some((errorinstance) => err instanceof errorinstance))
            return [err];
        if (err instanceof Error)
            return [err];
        throw err;
    }
};
exports.catchError = catchError;
const tryAndThrow = (fn) => __awaiter(void 0, void 0, void 0, function* () {
    return function (...arg) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield fn(...arg)
                .then((data) => data)
                .catch((err) => {
                throw err;
            });
        });
    };
});
exports.tryAndThrow = tryAndThrow;
