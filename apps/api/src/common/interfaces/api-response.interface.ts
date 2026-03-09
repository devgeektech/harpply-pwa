/**
 * Standard API response shape for all success and error responses.
 * Use the same structure so clients can always expect the same fields.
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  statusCode: number;
  message: string;
  data?: T;
  timestamp: string;
  path?: string;
}

/** Success response: success=true, optional data */
export interface SuccessResponse<T = unknown> extends ApiResponse<T> {
  success: true;
  data?: T;
}

/** Error response: success=false, optional error details (e.g. stack in dev) */
export interface ErrorResponse extends ApiResponse<never> {
  success: false;
  error?: string;
}
