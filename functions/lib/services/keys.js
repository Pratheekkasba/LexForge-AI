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
exports.validateJwt = exports.validateApiKey = exports.hashKey = void 0;
const crypto = __importStar(require("crypto"));
const admin = __importStar(require("firebase-admin"));
const errors_1 = require("../utils/errors");
const hashKey = (key) => {
    return crypto.createHash('sha256').update(key).digest('hex');
};
exports.hashKey = hashKey;
const validateApiKey = async (rawKey) => {
    if (!admin.apps.length)
        admin.initializeApp();
    const db = admin.firestore();
    // The client passes the raw key `sk_live_12345...`
    // The database stores the key exactly as it is since I'm going to migrate it from the frontend implementation which stores it in plaintext for demo purposes.
    // In a real production system, the frontend would NEVER have access to store the full key, 
    // it would call a cloud function that generates it, hashes it, saves the hash, and returns the raw key ONCE.
    // For the sake of this architectural demo interacting with the frontend we built, we will query the exact key.
    const snapshot = await db
        .collection('apiKeys')
        .where('key', '==', rawKey)
        .where('status', '==', 'active')
        .limit(1)
        .get();
    if (snapshot.empty) {
        throw new errors_1.ApiError(401, 'Invalid API Key', errors_1.ErrorCodes.UNAUTHORIZED);
    }
    const keyDoc = snapshot.docs[0];
    const keyData = keyDoc.data();
    // Update last used asynchronously
    keyDoc.ref.update({
        lastUsed: admin.firestore.FieldValue.serverTimestamp()
    }).catch(console.error);
    return {
        id: keyDoc.id,
        organizationId: keyData.organizationId,
        permissions: keyData.permissions || ['read', 'write'],
    };
};
exports.validateApiKey = validateApiKey;
// Validates a Firebase Auth JWT (Bearer Token passed by frontend Dashboard Playground)
const validateJwt = async (token) => {
    if (!admin.apps.length)
        admin.initializeApp();
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        // Get user profile to find organization
        const userDoc = await admin.firestore().collection('users').doc(decodedToken.uid).get();
        if (!userDoc.exists) {
            throw new Error('User profile not found');
        }
        return {
            userId: decodedToken.uid,
            organizationId: userDoc.data()?.organizationId,
            role: userDoc.data()?.role,
        };
    }
    catch (error) {
        throw new errors_1.ApiError(401, 'Invalid authentication token', errors_1.ErrorCodes.UNAUTHORIZED);
    }
};
exports.validateJwt = validateJwt;
//# sourceMappingURL=keys.js.map