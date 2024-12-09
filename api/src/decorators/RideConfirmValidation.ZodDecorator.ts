import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { ZodSchema } from 'zod';

interface Schemas {
  body?: ZodSchema;
  query?: ZodSchema;
  params?: ZodSchema;
}

export function RideConfirmValidation(schemas: Schemas): ParameterDecorator {
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

      if (body.options.length < 1) {
        throw new HttpException('INVALID_DATA', 400);
      }
    }

    if (schemas?.query && query) {
      const queryResult = schemas.query.safeParse(query);

      if (!queryResult.success) {
        throw new HttpException('INVALID_DATA', 400);
      }
    }

    if (schemas?.params && params) {
      const paramsResult = schemas.params.safeParse(params);

      if (!paramsResult.success) {
        throw new HttpException('INVALID_DATA', 400);
      }
    }
  });
}
