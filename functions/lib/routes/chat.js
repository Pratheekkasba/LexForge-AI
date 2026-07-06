"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const logger_1 = require("../utils/logger");
const llm_1 = require("../services/llm");
const router = (0, express_1.Router)();
router.post('/', async (req, res) => {
    const startTime = Date.now();
    try {
        const { messages, model, stream } = req.body;
        // In production, Zod validation goes here
        if (!messages || !Array.isArray(messages)) {
            res.status(400).json({ error: 'messages array is required' });
            await (0, logger_1.logApiRequest)(req, 400, Date.now() - startTime);
            return;
        }
        const { tokensUsed } = await (0, llm_1.executeLLMRequest)({ messages, model, stream }, res, 'You are a legal AI assistant specialized in LexForge intelligence.');
        // If it's a streaming response, the response is already closed by executeLLMRequest
        // We just need to log it.
        await (0, logger_1.logApiRequest)(req, 200, Date.now() - startTime, tokensUsed);
    }
    catch (error) {
        console.error('Chat API Error:', error);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Internal server error' });
        }
        await (0, logger_1.logApiRequest)(req, 500, Date.now() - startTime);
    }
});
exports.default = router;
//# sourceMappingURL=chat.js.map