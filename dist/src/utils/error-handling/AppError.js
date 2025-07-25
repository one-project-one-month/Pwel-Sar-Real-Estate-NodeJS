"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = exports.isErrorKinds = exports.errorKinds = void 0;
const Status_1 = require("../../config/Status");
exports.errorKinds = {
    invalidToken: "invalidToken",
    internalServerError: "internalErrorServer",
    validationFailed: "validationFailed",
    invalidCredential: "invalidCredential",
    notFound: "notFound",
    notAuthorized: "notAuthorized",
    alreadyExist: "alreadyExist",
    forbidden: "forbidden",
    accessDenied: "accessDenied",
    unVerifyAccount: "unVerifyAccount",
    badRequest: "badRequest",
    oauthAccountAlreadyExist: "oauthAccountAlreadyExist",
    mailboxUnavailable: "mailboxUnavailable",
};
const isErrorKinds = (message) => {
    return Object.values(exports.errorKinds).includes(message);
};
exports.isErrorKinds = isErrorKinds;
class AppError extends Error {
    constructor(error, message, payload) {
        super();
        this.error = error;
        this.message = message;
        this.payload = payload;
        this.statusCode = Status_1.StatusCode.InternalServerError;
        this.statusCode = this.getStatus();
        Error.captureStackTrace(this, this.constructor);
    }
    static new(error = exports.errorKinds.internalServerError, message = "internal Server Error", payload) {
        return payload
            ? new AppError(error, message, payload)
            : new AppError(error, message);
    }
    errorPayload(payload) {
        return {
            message: this.message,
            errors: payload ? payload : {},
        };
    }
    getStatus() {
        // let error_status : StatusCode = StatusCode.InternalServerError;
        switch (this.error) {
            case exports.errorKinds.internalServerError:
                this.statusCode = Status_1.StatusCode.InternalServerError;
                break;
            case exports.errorKinds.invalidToken:
                this.statusCode = Status_1.StatusCode.Forbidden;
                break;
            case exports.errorKinds.notFound:
                this.statusCode = Status_1.StatusCode.NotFound;
                break;
            case exports.errorKinds.notAuthorized:
                this.statusCode = Status_1.StatusCode.Unauthorized;
                break;
            case exports.errorKinds.validationFailed:
                this.statusCode = Status_1.StatusCode.UnprocessableEntity;
                break;
            case exports.errorKinds.invalidCredential:
                this.statusCode = Status_1.StatusCode.UnprocessableEntity;
                break;
            case exports.errorKinds.alreadyExist:
                this.statusCode = Status_1.StatusCode.Conflict;
                break;
            case exports.errorKinds.forbidden:
                this.statusCode = Status_1.StatusCode.Forbidden;
                break;
            case exports.errorKinds.accessDenied:
                this.statusCode = Status_1.StatusCode.Forbidden;
                break;
            case exports.errorKinds.unVerifyAccount:
                this.statusCode = Status_1.StatusCode.Forbidden;
                break;
            case exports.errorKinds.oauthAccountAlreadyExist:
                this.statusCode = Status_1.StatusCode.Conflict;
                break;
            case exports.errorKinds.badRequest:
                this.statusCode = Status_1.StatusCode.BadRequest;
                break;
            case exports.errorKinds.mailboxUnavailable:
                this.statusCode = Status_1.StatusCode.MailboxUnavailable;
                break;
        }
        return this.statusCode;
    }
    response(res) {
        return res
            .status(this.statusCode)
            .json(this.errorPayload(this.payload))
            .end();
    }
}
exports.AppError = AppError;
// export default AppError;
