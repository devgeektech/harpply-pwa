import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { errorResponse } from '../response/api-response';
import { BusinessException } from '../exceptions/business.exception';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | string[] = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      const resObj =
        typeof res === 'object' && res
          ? (res as Record<string, unknown>)
          : null;
      message =
        resObj && typeof resObj.message !== 'undefined'
          ? (resObj.message as string | string[])
          : (res as string) || exception.message;
      // Pass through optional `code` for client handling (e.g. COMPLETE_SIGNUP)
      const code =
        resObj && typeof resObj.code === 'string' ? resObj.code : undefined;
      const messageStr = Array.isArray(message) ? message.join(', ') : message;
      this.logger.warn(
        `${request.method} ${request.url} ${status} - ${messageStr}`,
      );
      if (
        status === HttpStatus.INTERNAL_SERVER_ERROR &&
        exception instanceof Error
      ) {
        this.logger.error(exception.message);
        this.logger.error(exception.stack);
      }
      const body = code
        ? {
            success: false as const,
            statusCode: status,
            message: messageStr,
            code,
          }
        : errorResponse(messageStr, status);
      response.status(status).json(body);
      return;
    } else if (exception instanceof BusinessException) {
      status = exception.status;
      message = exception.message;
    } else if (exception && typeof exception === 'object') {
      const err = exception as any;
      const code = err.code;
      const causeCode = err.cause?.originalCode ?? err.meta?.originalCode;
      if (code === 'P1001' || code === 'P1017' || causeCode === '28P01') {
        status = HttpStatus.SERVICE_UNAVAILABLE;
        message =
          'Database connection failed. Check DATABASE_URL and that Postgres is running (e.g. docker compose up db).';
      } else if (code === 'P2025') {
        status = HttpStatus.NOT_FOUND;
        message = 'Record not found.';
      } else if (code === 'P2002') {
        status = HttpStatus.CONFLICT;
        message = err.meta?.target?.includes('email')
          ? 'An account with this email already exists.'
          : 'A record with this value already exists.';
      } else if (err.message) {
        // Prisma or other errors: use real message in dev so you can see e.g. null constraint
        message = err.message;
      }
    }

    const messageStr =
      (Array.isArray(message) ? message.join(', ') : message) ||
      'Internal server error';
    this.logger.warn(
      `${request.method} ${request.url} ${status} - ${messageStr}`,
    );

    if (
      status === HttpStatus.INTERNAL_SERVER_ERROR &&
      exception instanceof Error
    ) {
      this.logger.error(exception.message);
      this.logger.error(exception.stack);
    }

    const body = errorResponse(messageStr, status);
    response.status(status).json(body);
  }
}
