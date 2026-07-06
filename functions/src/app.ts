import * as express from 'express';
import * as cors from 'cors';
import { authMiddleware } from './middleware/auth';
import { rateLimitMiddleware } from './middleware/rateLimit';

import chatRouter from './routes/chat';
import contractsRouter from './routes/contracts';
import legalRouter from './routes/legal';
import citationsRouter from './routes/citations';
import researchRouter from './routes/research';

const app = express.default();

// Global middleware
app.use(cors.default({ origin: true }));
app.use(express.json());

// Gateway specific middleware for all API routes
app.use(authMiddleware);
app.use(rateLimitMiddleware);

// Routes
app.use('/chat', chatRouter);
app.use('/contracts', contractsRouter);
app.use('/legal', legalRouter);
app.use('/citations', citationsRouter);
app.use('/research', researchRouter);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

export default app;
