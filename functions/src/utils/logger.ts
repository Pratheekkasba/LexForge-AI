import * as admin from 'firebase-admin';
import { Request } from 'express';

// Define the type so TypeScript knows what it contains
export interface AppRequest extends Request {
  organizationId?: string;
  userId?: string;
  apiKeyId?: string;
}

export const logApiRequest = async (
  req: AppRequest,
  statusCode: number,
  durationMs: number,
  tokensUsed: number = 0
) => {
  if (!admin.apps.length) {
    admin.initializeApp();
  }
  
  const db = admin.firestore();
  const orgId = req.organizationId;
  const userId = req.userId;

  if (!orgId) return; // If we couldn't resolve an org, we can't bill it

  const logEntry = {
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
    organizationId: orgId,
    userId: userId || 'api_key',
    apiKeyId: req.apiKeyId || null,
    method: req.method,
    path: req.path,
    statusCode,
    durationMs,
    tokensUsed,
    ip: req.ip || req.headers['x-forwarded-for'] || 'unknown',
  };

  try {
    // 1. Write the raw log
    await db.collection('api_logs').add(logEntry);

    // 2. Increment organization usage in a transaction or simply using increment
    if (tokensUsed > 0 || statusCode < 400) {
      const orgRef = db.collection('organizations').doc(orgId);
      await orgRef.update({
        'usage.apiCalls': admin.firestore.FieldValue.increment(1),
        'usage.tokensUsed': admin.firestore.FieldValue.increment(tokensUsed),
      });
    }
  } catch (error) {
    console.error('Failed to log API request', error);
  }
};
