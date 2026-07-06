"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const https_1 = require("firebase-functions/v2/https");
const app_1 = __importDefault(require("./app"));
// Export the Express app as a Firebase Cloud Function called "api"
exports.api = (0, https_1.onRequest)({
    cors: true,
    maxInstances: 10,
    memory: '256MiB',
    timeoutSeconds: 60,
}, app_1.default);
//# sourceMappingURL=index.js.map