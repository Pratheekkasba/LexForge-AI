"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorCodes = exports.ApiError = void 0;
class ApiError extends Error {
    statusCode;
    message;
    code;
    details;
    constructor(statusCode, message, code = 'internal_error', details) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.code = code;
        this.details = details;
        this.name = 'ApiError';
    }
}
exports.ApiError = ApiError;
exports.ErrorCodes = {
    UNAUTHORIZED: 'unauthorized',
    FORBIDDEN: 'forbidden',
    RATE_LIMITED: 'rate_limited',
    QUOTA_EXCEEDED: 'quota_exceeded',
    BAD_REQUEST: 'bad_request',
    NOT_FOUND: 'not_found',
    INTERNAL_ERROR: 'internal_error',
};
//# sourceMappingURL=errors.js.map