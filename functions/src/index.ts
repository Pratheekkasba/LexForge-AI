import { onRequest } from 'firebase-functions/v2/https';
import app from './app';

// Export the Express app as a Firebase Cloud Function called "api"
export const api = onRequest({
  cors: true,
  maxInstances: 10,
  memory: '256MiB',
  timeoutSeconds: 60,
}, app);

export * from './triggers';
