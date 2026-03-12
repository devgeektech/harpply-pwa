import { BusinessException } from './business.exception';
export class UnauthorizedException extends BusinessException {
  constructor(message = 'Invalid credentials') {
    super('UNAUTHORIZED', message, 401);
  }
}