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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const cors = __importStar(require("cors"));
const auth_1 = require("./middleware/auth");
const rateLimit_1 = require("./middleware/rateLimit");
const chat_1 = __importDefault(require("./routes/chat"));
const contracts_1 = __importDefault(require("./routes/contracts"));
const legal_1 = __importDefault(require("./routes/legal"));
const citations_1 = __importDefault(require("./routes/citations"));
const research_1 = __importDefault(require("./routes/research"));
const app = express.default();
// Global middleware
app.use(cors.default({ origin: true }));
app.use(express.json());
// Gateway specific middleware for all API routes
app.use(auth_1.authMiddleware);
app.use(rateLimit_1.rateLimitMiddleware);
// Routes
app.use('/chat', chat_1.default);
app.use('/contracts', contracts_1.default);
app.use('/legal', legal_1.default);
app.use('/citations', citations_1.default);
app.use('/research', research_1.default);
// 404 handler
app.use((_req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});
exports.default = app;
//# sourceMappingURL=app.js.map