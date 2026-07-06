export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public code: string = 'internal_error',
    public details?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const ErrorCodes = {
  UNAUTHORIZED: 'unauthorized',
  FORBIDDEN: 'forbidden',
  RATE_LIMITED: 'rate_limited',
  QUOTA_EXCEEDED: 'quota_exceeded',
  BAD_REQUEST: 'bad_request',
  NOT_FOUND: 'not_found',
  INTERNAL_ERROR: 'internal_error',
};
