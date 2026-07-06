"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const logger_1 = require("../utils/logger");
const llm_1 = require("../services/llm");
const router = (0, express_1.Router)();
router.post('/analyze', async (req, res) => {
    const startTime = Date.now();
    try {
        const { document, model, stream } = req.body;
        if (!document) {
            res.status(400).json({ error: 'document text is required' });
            await (0, logger_1.logApiRequest)(req, 400, Date.now() - startTime);
            return;
        }
        const { tokensUsed } = await (0, llm_1.executeLLMRequest)({ prompt: document, model, stream }, res, 'You are a legal AI trained to analyze contracts and identify risks.');
        await (0, logger_1.logApiRequest)(req, 200, Date.now() - startTime, tokensUsed);
    }
    catch (error) {
        if (!res.headersSent)
            res.status(500).json({ error: 'Internal server error' });
        await (0, logger_1.logApiRequest)(req, 500, Date.now() - startTime);
    }
});
router.post('/draft', async (req, res) => {
    const startTime = Date.now();
    try {
        const { instructions, model, stream } = req.body;
        if (!instructions) {
            res.status(400).json({ error: 'instructions are required' });
            await (0, logger_1.logApiRequest)(req, 400, Date.now() - startTime);
            return;
        }
        const { tokensUsed } = await (0, llm_1.executeLLMRequest)({ prompt: instructions, model, stream }, res, 'You are a legal AI trained to draft standard contracts based on instructions.');
        await (0, logger_1.logApiRequest)(req, 200, Date.now() - startTime, tokensUsed);
    }
    catch (error) {
        if (!res.headersSent)
            res.status(500).json({ error: 'Internal server error' });
        await (0, logger_1.logApiRequest)(req, 500, Date.now() - startTime);
    }
});
exports.default = router;
//# sourceMappingURL=contracts.js.map