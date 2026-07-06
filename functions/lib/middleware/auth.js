"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const keys_1 = require("../services/keys");
const errors_1 = require("../utils/errors");
const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new errors_1.ApiError(401, 'Missing or invalid Authorization header', errors_1.ErrorCodes.UNAUTHORIZED);
        }
        const token = authHeader.split('Bearer ')[1].trim();
        // Determine if it's an API Key or a JWT
        if (token.startsWith('sk_')) {
            // It's an API key
            const keyData = await (0, keys_1.validateApiKey)(token);
            req.organizationId = keyData.organizationId;
            req.apiKeyId = keyData.id;
        }
        else {
            // It's a JWT (Playground usage)
            const jwtData = await (0, keys_1.validateJwt)(token);
            req.userId = jwtData.userId;
            req.organizationId = jwtData.organizationId;
        }
        next();
    }
    catch (error) {
        if (error instanceof errors_1.ApiError) {
            res.status(error.statusCode).json({ error: error.message, code: error.code });
        }
        else {
            res.status(401).json({ error: 'Unauthorized', code: errors_1.ErrorCodes.UNAUTHORIZED });
        }
    }
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=auth.js.map