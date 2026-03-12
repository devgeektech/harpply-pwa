import type { ApiResponse, SuccessResponse } from '../interfaces/api-response.interface';

/**
 * Build a standard success response for all APIs.
 * Use in controllers/services for consistent response format.
 */
export function successResponse<T>(
  message: string,
  options?: { data?: T; statusCode?: number; path?: string },
): SuccessResponse<T> {
  const { data, statusCode = 200, path } = options ?? {};
  const res: SuccessResponse<T> = {
    success: true,
    statusCode,
    message,
    timestamp: new Date().toISOString(),
  };
  if (data !== undefined) res.data = data;
  if (path !== undefined) res.path = path;
  return res;
}

/**
 * Build a standard error response – only success, statusCode, message.
 * Used by the global exception filter.
 */
export function errorResponse(
  message: string,
  statusCode: number,
): { success: false; statusCode: number; message: string } {
  return {
    success: false,
    statusCode,
    message,
  };
}
