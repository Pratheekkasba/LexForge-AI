import { Response, Router } from 'express';
import { AppRequest, logApiRequest } from '../utils/logger';
import { executeLLMRequest } from '../services/llm';

const router = Router();

router.post('/', async (req: AppRequest, res: Response) => {
  const startTime = Date.now();
  try {
    const { messages, model, stream } = req.body;
    
    // In production, Zod validation goes here
    if (!messages || !Array.isArray(messages)) {
      res.status(400).json({ error: 'messages array is required' });
      await logApiRequest(req, 400, Date.now() - startTime);
      return;
    }

    const { tokensUsed } = await executeLLMRequest(
      { messages, model, stream }, 
      res, 
      'You are a legal AI assistant specialized in LexForge intelligence.'
    );

    // If it's a streaming response, the response is already closed by executeLLMRequest
    // We just need to log it.
    await logApiRequest(req, 200, Date.now() - startTime, tokensUsed);
    
  } catch (error) {
    console.error('Chat API Error:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Internal server error' });
    }
    await logApiRequest(req, 500, Date.now() - startTime);
  }
});

export default router;
