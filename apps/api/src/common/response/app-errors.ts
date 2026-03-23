import { BadRequestException } from '@nestjs/common';
import { BusinessException } from '../exceptions/business.exception';
import { ConflictException } from '../exceptions/conflict.exception';
import { NotFoundException } from '../exceptions/not-found.exception';
import { UnauthorizedException } from '../exceptions/unauthorized.exception';

/**
 * Common error helpers – throw these to get the same response shape as successResponse
 * (success: false, statusCode, message, timestamp). The global AllExceptionsFilter
 * catches them and returns the standard API error format.
 */

export function throwBadRequest(message: string): never {
  throw new BadRequestException(message);
}

export function throwUnauthorized(
  message: string = 'Invalid email or password.',
): never {
  throw new UnauthorizedException(message);
}

export function throwNotFound(message: string = 'Resource not found.'): never {
  throw new NotFoundException(message);
}

export function throwConflict(
  message: string = 'Resource already exists.',
): never {
  throw new ConflictException(message);
}

/** Custom business error with any status code (400–499). */
export function throwBusinessError(
  message: string,
  status: number = 400,
  code: string = 'BUSINESS_ERROR',
): never {
  throw new BusinessException(code, message, status);
}
