import type { ParamDecorators, SwaggerOptions } from './decorator-type';
import { ApiResponseMetadata, ApiResponseOptions } from './decorator-type';

import { applyDecorators, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { isUndefined, negate, omit, pickBy } from 'lodash';
import { DECORATORS } from './constants';
import { createBody, createHeader, createParam, createQuery, getTypeIsArrayTuple } from './helper';

/** @function */
/** Usage : Only Method Decorator */
export const RequestApi = (swaggerOptions: SwaggerOptions): MethodDecorator => {
  const { headers, params, query, body } = swaggerOptions;
  const paramDecorators: ParamDecorators[] = [];

  if (headers) paramDecorators.push(...(Array.isArray(headers) ? headers.map(createHeader) : [createHeader(headers)]));
  if (params) paramDecorators.push(...(Array.isArray(params) ? params.map(createParam) : [createParam(params)]));
  if (query) paramDecorators.push(...(Array.isArray(query) ? query.map(createQuery) : [createQuery(query)]));
  if (body) paramDecorators.push(...(Array.isArray(body) ? body.map(createBody) : [createBody(body)]));

  return (target: object, key: string | symbol, descriptor: PropertyDescriptor) => {
    for (const { metadata, initial } of paramDecorators) {
      if (descriptor) {
        const parameters = Reflect.getMetadata(DECORATORS.API_PARAMETERS, descriptor.value) || [];

        Reflect.defineMetadata(
          DECORATORS.API_PARAMETERS,
          [
            ...parameters,
            {
              ...initial,
              ...pickBy(metadata, negate(isUndefined)),
            },
          ],
          descriptor.value
        );
      }
    }

    return descriptor;
  };
};

export const ResponseApi = (options: ApiResponseOptions & { isPaging?: boolean }): MethodDecorator & ClassDecorator => {
  const [type, isArray] = getTypeIsArrayTuple(
    (options as ApiResponseMetadata).type,
    (options as ApiResponseMetadata).isArray
  );

  if (options.isPaging && !!type) {
    (options as ApiResponseMetadata).type = type;
    (options as ApiResponseMetadata).isArray = isArray;
    options.description = options.description ? options.description : '';

    const groupedMetadata = {
      [options.status || 'default']: omit(options, 'status'),
    };
    return (target: object, key?: string | symbol, descriptor?: TypedPropertyDescriptor<any>): any => {
      if (descriptor) {
        const responses = Reflect.getMetadata(DECORATORS.API_RESPONSE, descriptor.value) || {};

        Reflect.defineMetadata(
          DECORATORS.API_RESPONSE,
          {
            ...responses,
            ...groupedMetadata,
          },
          descriptor.value
        );

        ApiExtraModels(type)(target, key, descriptor);

        return ResponseApi({
          schema: {
            properties: {
              paging: {
                type: 'object',
                properties: {
                  total: {
                    type: 'number',
                  },
                  page: {
                    type: 'number',
                  },
                  limit: {
                    type: 'number',
                  },
                  skip: {
                    type: 'number',
                  },
                  hasPrev: {
                    type: 'boolean',
                  },
                  hasNext: {
                    type: 'boolean',
                  },
                },
              },
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(type as Function) },
              },
            },
          },
        })(target, key as string | symbol, descriptor);
      }
    };
  }
  return applyDecorators(ApiResponse(options));
};
export const ApiFile = (fieldName = 'file') => {
  return applyDecorators(
    UseInterceptors(FileInterceptor(fieldName)),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          [fieldName]: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    })
  );
};

export const Auth = (guard: Function, name = 'access-token') => {
  return applyDecorators(ApiBearerAuth(name), UseGuards(guard));
};
