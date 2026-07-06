"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const logger_1 = require("../utils/logger");
const llm_1 = require("../services/llm");
const router = (0, express_1.Router)();
router.post('/summarize', async (req, res) => {
    const startTime = Date.now();
    try {
        const { text, model, stream } = req.body;
        if (!text) {
            res.status(400).json({ error: 'text is required' });
            await (0, logger_1.logApiRequest)(req, 400, Date.now() - startTime);
            return;
        }
        const { tokensUsed } = await (0, llm_1.executeLLMRequest)({ prompt: text, model, stream }, res, 'You are a legal AI trained to summarize dense legal texts accurately.');
        await (0, logger_1.logApiRequest)(req, 200, Date.now() - startTime, tokensUsed);
    }
    catch (error) {
        if (!res.headersSent)
            res.status(500).json({ error: 'Internal server error' });
        await (0, logger_1.logApiRequest)(req, 500, Date.now() - startTime);
    }
});
exports.default = router;
//# sourceMappingURL=legal.js.map