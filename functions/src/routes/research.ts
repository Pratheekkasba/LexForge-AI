import { Response, Router } from 'express';
import { AppRequest, logApiRequest } from '../utils/logger';
import { executeLLMRequest } from '../services/llm';

const router = Router();

router.post('/', async (req: AppRequest, res: Response) => {
  const startTime = Date.now();
  try {
    const { query, model, stream } = req.body;
    
    if (!query) {
      res.status(400).json({ error: 'query is required' });
      await logApiRequest(req, 400, Date.now() - startTime);
      return;
    }

    const { tokensUsed } = await executeLLMRequest(
      { prompt: query, model, stream }, 
      res, 
      'You are a legal AI trained to perform deep legal research and synthesize precedents.'
    );

    await logApiRequest(req, 200, Date.now() - startTime, tokensUsed);
  } catch (error) {
    if (!res.headersSent) res.status(500).json({ error: 'Internal server error' });
    await logApiRequest(req, 500, Date.now() - startTime);
  }
});

export default router;
