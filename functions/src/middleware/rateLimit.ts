import { Response, NextFunction } from 'express';
import { AppRequest } from '../utils/logger';
import { ErrorCodes } from '../utils/errors';
import * as admin from 'firebase-admin';

// In-memory rate limiting store (For production, use Redis)
const windowMs = 60 * 1000; // 1 minute
const maxRequestsPerWindow = 60; // 60 RPM
const requestCounts = new Map<string, { count: number, resetTime: number }>();

export const rateLimitMiddleware = async (req: AppRequest, res: Response, next: NextFunction) => {
  const orgId = req.organizationId;
  if (!orgId) return next(); // Fallback if no org ID, though Auth should have caught it

  const now = Date.now();
  let record = requestCounts.get(orgId);

  if (!record || now > record.resetTime) {
    record = { count: 0, resetTime: now + windowMs };
  }

  record.count++;
  requestCounts.set(orgId, record);

  // Set standard RateLimit headers
  res.setHeader('X-RateLimit-Limit', maxRequestsPerWindow);
  res.setHeader('X-RateLimit-Remaining', Math.max(0, maxRequestsPerWindow - record.count));
  res.setHeader('X-RateLimit-Reset', Math.ceil(record.resetTime / 1000));

  if (record.count > maxRequestsPerWindow) {
    res.status(429).json({ 
      error: 'Too many requests. Please try again later.', 
      code: ErrorCodes.RATE_LIMITED 
    });
    return;
  }

  // Also check monthly quotas
  try {
    const db = admin.firestore();
    const orgDoc = await db.collection('organizations').doc(orgId).get();
    const usage = orgDoc.data()?.usage || {};
    const sub = orgDoc.data()?.subscription || 'free';

    // Simple quota logic based on subscription
    const quotas: Record<string, number> = {
      'free': 1000,
      'starter': 10000,
      'professional': 100000,
      'enterprise': 1000000
    };

    const limit = quotas[sub] || quotas['free'];
    
    if (usage.apiCalls >= limit) {
      res.status(403).json({ 
        error: `Monthly quota of ${limit} requests exceeded. Please upgrade your plan.`, 
        code: ErrorCodes.QUOTA_EXCEEDED 
      });
      return;
    }

  } catch (error) {
    console.error('Failed to check quota:', error);
    // Fail open to avoid blocking legitimate requests during DB issues
  }

  next();
};
