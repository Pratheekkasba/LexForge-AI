"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.logApiRequest = void 0;
const admin = __importStar(require("firebase-admin"));
const logApiRequest = async (req, statusCode, durationMs, tokensUsed = 0) => {
    if (!admin.apps.length) {
        admin.initializeApp();
    }
    const db = admin.firestore();
    const orgId = req.organizationId;
    const userId = req.userId;
    if (!orgId)
        return; // If we couldn't resolve an org, we can't bill it
    const logEntry = {
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        organizationId: orgId,
        userId: userId || 'api_key',
        apiKeyId: req.apiKeyId || null,
        method: req.method,
        path: req.path,
        statusCode,
        durationMs,
        tokensUsed,
        ip: req.ip || req.headers['x-forwarded-for'] || 'unknown',
    };
    try {
        // 1. Write the raw log
        await db.collection('api_logs').add(logEntry);
        // 2. Increment organization usage in a transaction or simply using increment
        if (tokensUsed > 0 || statusCode < 400) {
            const orgRef = db.collection('organizations').doc(orgId);
            await orgRef.update({
                'usage.apiCalls': admin.firestore.FieldValue.increment(1),
                'usage.tokensUsed': admin.firestore.FieldValue.increment(tokensUsed),
            });
        }
    }
    catch (error) {
        console.error('Failed to log API request', error);
    }
};
exports.logApiRequest = logApiRequest;
//# sourceMappingURL=logger.js.map