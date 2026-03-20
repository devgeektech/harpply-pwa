import { BusinessException } from './business.exception';
export class ConflictException extends BusinessException {
  constructor(message = 'Resource already exists') {
    super('CONFLICT', message, 409);
  }
}
