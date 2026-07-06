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
exports.rateLimitMiddleware = void 0;
const errors_1 = require("../utils/errors");
const admin = __importStar(require("firebase-admin"));
// In-memory rate limiting store (For production, use Redis)
const windowMs = 60 * 1000; // 1 minute
const maxRequestsPerWindow = 60; // 60 RPM
const requestCounts = new Map();
const rateLimitMiddleware = async (req, res, next) => {
    const orgId = req.organizationId;
    if (!orgId)
        return next(); // Fallback if no org ID, though Auth should have caught it
    const now = Date.now();
    let record = requestCounts.get(orgId);
    if (!record || now > record.resetTime) {
        record = { count: 0, resetTime: now + windowMs };
    }
    record.count++;
    requestCounts.set(orgId, record);
    // Set standard RateLimit headers
    res.setHeader('X-RateLimit-Limit', maxRequestsPerWindow);
    res.setHeader('X-RateLimit-Remaining', Math.max(0, maxRequestsPerWindow - record.count));
    res.setHeader('X-RateLimit-Reset', Math.ceil(record.resetTime / 1000));
    if (record.count > maxRequestsPerWindow) {
        res.status(429).json({
            error: 'Too many requests. Please try again later.',
            code: errors_1.ErrorCodes.RATE_LIMITED
        });
        return;
    }
    // Also check monthly quotas
    try {
        const db = admin.firestore();
        const orgDoc = await db.collection('organizations').doc(orgId).get();
        const usage = orgDoc.data()?.usage || {};
        const sub = orgDoc.data()?.subscription || 'free';
        // Simple quota logic based on subscription
        const quotas = {
            'free': 1000,
            'starter': 10000,
            'professional': 100000,
            'enterprise': 1000000
        };
        const limit = quotas[sub] || quotas['free'];
        if (usage.apiCalls >= limit) {
            res.status(403).json({
                error: `Monthly quota of ${limit} requests exceeded. Please upgrade your plan.`,
                code: errors_1.ErrorCodes.QUOTA_EXCEEDED
            });
            return;
        }
    }
    catch (error) {
        console.error('Failed to check quota:', error);
        // Fail open to avoid blocking legitimate requests during DB issues
    }
    next();
};
exports.rateLimitMiddleware = rateLimitMiddleware;
//# sourceMappingURL=rateLimit.js.map