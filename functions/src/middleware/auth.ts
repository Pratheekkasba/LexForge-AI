import { Response, NextFunction } from 'express';
import { AppRequest } from '../utils/logger';
import { validateApiKey, validateJwt } from '../services/keys';
import { ApiError, ErrorCodes } from '../utils/errors';

export const authMiddleware = async (req: AppRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new ApiError(401, 'Missing or invalid Authorization header', ErrorCodes.UNAUTHORIZED);
    }

    const token = authHeader.split('Bearer ')[1].trim();

    // Determine if it's an API Key or a JWT
    if (token.startsWith('sk_')) {
      // It's an API key
      const keyData = await validateApiKey(token);
      req.organizationId = keyData.organizationId;
      req.apiKeyId = keyData.id;
    } else {
      // It's a JWT (Playground usage)
      const jwtData = await validateJwt(token);
      req.userId = jwtData.userId;
      req.organizationId = jwtData.organizationId;
    }

    next();
  } catch (error) {
    if (error instanceof ApiError) {
      res.status(error.statusCode).json({ error: error.message, code: error.code });
    } else {
      res.status(401).json({ error: 'Unauthorized', code: ErrorCodes.UNAUTHORIZED });
    }
  }
};
