import { Response, Router } from 'express';
import { AppRequest, logApiRequest } from '../utils/logger';
import { executeLLMRequest } from '../services/llm';

const router = Router();

router.post('/analyze', async (req: AppRequest, res: Response) => {
  const startTime = Date.now();
  try {
    const { document, model, stream } = req.body;
    
    if (!document) {
      res.status(400).json({ error: 'document text is required' });
      await logApiRequest(req, 400, Date.now() - startTime);
      return;
    }

    const { tokensUsed } = await executeLLMRequest(
      { prompt: document, model, stream }, 
      res, 
      'You are a legal AI trained to analyze contracts and identify risks.'
    );

    await logApiRequest(req, 200, Date.now() - startTime, tokensUsed);
  } catch (error) {
    if (!res.headersSent) res.status(500).json({ error: 'Internal server error' });
    await logApiRequest(req, 500, Date.now() - startTime);
  }
});

router.post('/draft', async (req: AppRequest, res: Response) => {
  const startTime = Date.now();
  try {
    const { instructions, model, stream } = req.body;
    
    if (!instructions) {
      res.status(400).json({ error: 'instructions are required' });
      await logApiRequest(req, 400, Date.now() - startTime);
      return;
    }

    const { tokensUsed } = await executeLLMRequest(
      { prompt: instructions, model, stream }, 
      res, 
      'You are a legal AI trained to draft standard contracts based on instructions.'
    );

    await logApiRequest(req, 200, Date.now() - startTime, tokensUsed);
  } catch (error) {
    if (!res.headersSent) res.status(500).json({ error: 'Internal server error' });
    await logApiRequest(req, 500, Date.now() - startTime);
  }
});

export default router;
