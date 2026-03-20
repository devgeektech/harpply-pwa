// src/common/exceptions/not-found.exception.ts
import { BusinessException } from './business.exception';

export class NotFoundException extends BusinessException {
  constructor(message = 'Resource not found') {
    super('NOT_FOUND', message, 404);
  }
}
