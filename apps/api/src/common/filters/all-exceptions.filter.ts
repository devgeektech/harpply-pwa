import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
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
      message = typeof res === 'object' && res && typeof (res as any).message !== 'undefined'
        ? (res as any).message
        : (res as string) || exception.message;
    } else if (exception && typeof exception === 'object') {
      const err = exception as any;
      const code = err.code;
      const causeCode = err.cause?.originalCode ?? err.meta?.originalCode;
      if (code === 'P1001' || code === 'P1017' || causeCode === '28P01') {
        status = HttpStatus.SERVICE_UNAVAILABLE;
        message = 'Database connection failed. Check DATABASE_URL and that Postgres is running (e.g. docker compose up db).';
      } else if (code === 'P2025') {
        status = HttpStatus.NOT_FOUND;
        message = 'Record not found.';
      }
    }

    this.logger.warn(
      `${request.method} ${request.url} ${status} - ${Array.isArray(message) ? message.join(', ') : message}`,
    );

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: Array.isArray(message) ? message.join(', ') : message,
      ...(process.env.NODE_ENV !== 'production' && exception instanceof Error && {
        error: exception.stack,
      }),
    };

    response.status(status).json(errorResponse);
  }
}
