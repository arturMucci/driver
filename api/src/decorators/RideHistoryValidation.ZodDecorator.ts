import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ZodSchema } from 'zod';
import { HttpException } from '@nestjs/common';

interface Schemas {
  body?: ZodSchema;
  query?: ZodSchema;
  params?: ZodSchema;
}

export function RideHistoryValidation(schemas: Schemas): ParameterDecorator {
  return createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const { body, query, params } = request;

    if (schemas?.body && body) {
      const bodyResult = schemas.body.safeParse(body);

      if (!bodyResult.success) {
        throw new HttpException('INVALID_DATA', 400);
      }

      if (body.origin === body.destination) {
        throw new HttpException('INVALID_DATA', 400);
      }
    }

    if (schemas?.params && params) {
      const paramsResult = schemas.params.safeParse(params);
      if (!paramsResult.success) {
        throw new HttpException('INVALID_DATA', 400);
      }
    }

    return { body, query, params };
  })();
}
