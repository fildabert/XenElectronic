"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppError extends Error {
    constructor(errorCode, message, data) {
        super();
        this.errorCode = errorCode;
        this.message = message;
        this.data = data;
    }
}
exports.default = AppError;
//# sourceMappingURL=error.js.map