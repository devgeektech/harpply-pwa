import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ALLOW_EMPTY_BODY } from '../decorators/allow-empty-body.decorator';

@Injectable()
export class NotEmptyBodyGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const allowEmpty = this.reflector.getAllAndOverride<boolean>(
      ALLOW_EMPTY_BODY,
      [context.getHandler(), context.getClass()],
    );
    if (allowEmpty) return true;

    const request = context.switchToHttp().getRequest();
    const method = request.method;
    if (method !== 'PATCH' && method !== 'PUT' && method !== 'POST')
      return true;

    const body = request.body;
    if (body == null) return true; // no body at all (e.g. GET-style POST)
    if (typeof body !== 'object' || Array.isArray(body)) return true; // leave to ValidationPipe

    if (Object.keys(body).length === 0) {
      throw new BadRequestException(
        'Request body cannot be empty. Provide at least one field to update.',
      );
    }
    return true;
  }
}
