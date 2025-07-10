"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_handling_1 = require("../utils/error-handling");
class ValidationMiddleware {
    validate(props) {
        return (req, res, next) => {
            var _a;
            const { schema, target } = props;
            const validation = schema.safeParse(target === "BODY" ? req.body : req.query);
            if (!validation.success) {
                next(error_handling_1.AppError.new(error_handling_1.errorKinds.validationFailed, "validation Failed", Object.fromEntries(Object.entries((_a = validation.error) === null || _a === void 0 ? void 0 : _a.formErrors.fieldErrors).map(([key, value]) => [key, value !== null && value !== void 0 ? value : []]))));
            }
            else {
                next();
            }
        };
    }
    validateRequestQuery(schema) {
        return this.validate({
            schema,
            target: "QUERY",
        });
    }
    validateRequestBody(schema) {
        return this.validate({
            schema,
            target: "BODY",
        });
    }
}
exports.default = new ValidationMiddleware();
