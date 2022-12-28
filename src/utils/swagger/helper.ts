import { ApiBodyOptions, ApiHeaderOptions, ApiParamOptions, ApiQueryOptions } from '@nestjs/swagger';
import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { isArray, isNil, isUndefined, negate, omit, pickBy } from 'lodash';

import {
  ApiBodyMetadata,
  ApiParamMetadata,
  ApiQueryMetadata,
  defaultBodyMetadata,
  defaultHeaderOptions,
  defaultParamOptions,
  defaultQueryOptions,
  ParamDecorators,
  ParameterLocation,
} from './decorator-type';
import {
  addEnumArraySchema,
  addEnumSchema,
  getEnumType,
  getEnumValues,
  isEnumArray,
  isEnumDefined,
} from './enum-utils';

export function getTypeIsArrayTuple(
  input: Function | [Function] | undefined | string | Record<string, any>,
  isArrayFlag?: boolean
): [Function | undefined, boolean] {
  if (!input) {
    return [input as undefined, isArrayFlag ?? false];
  }
  if (isArrayFlag) {
    return [input as Function, isArrayFlag];
  }
  const isInputArray = isArray(input);
  const type = isInputArray ? input[0] : input;
  return [type as Function, isInputArray];
}

export const createParam = (params: ApiParamOptions): ParamDecorators => {
  const param: Record<string, any> = {
    in: 'path',
    ...omit(params, 'enum'),
  };

  const apiParamMetadata = params as ApiParamMetadata;
  if (apiParamMetadata.enum) {
    param.schema = param.schema || ({} as SchemaObject);

    const paramSchema = param.schema as SchemaObject;
    const enumValues = getEnumValues(apiParamMetadata.enum);
    paramSchema.type = getEnumType(enumValues);
    paramSchema.enum = enumValues;

    if (apiParamMetadata.enumName) {
      param.enumName = apiParamMetadata.enumName;
    }
  }
  return {
    metadata: param,
    initial: defaultParamOptions,
  };
};

export const createHeader = (headers: ApiHeaderOptions): ParamDecorators => {
  const param = pickBy<ApiHeaderOptions & { in: ParameterLocation }>(
    {
      name: isNil(headers.name) ? (defaultHeaderOptions.name as string) : headers.name,
      in: 'header',
      description: headers.description,
      required: headers.required,
      schema: {
        ...(headers.schema || {}),
        type: 'string',
      },
    },
    negate(isUndefined)
  );

  if (headers.enum) {
    const enumValues = getEnumValues(headers.enum);
    param.schema = {
      enum: enumValues,
      type: getEnumType(enumValues),
    };
  }
  return {
    metadata: param,
    initial: pickBy(headers, negate(isUndefined)),
  };
};

export const createQuery = (query: ApiQueryOptions): ParamDecorators => {
  const apiQueryMetadata = query as ApiQueryMetadata;
  const [type, isArray] = getTypeIsArrayTuple(apiQueryMetadata.type, apiQueryMetadata.isArray as boolean);
  const param: ApiQueryMetadata & Record<string, any> = {
    name: isNil(query.name) ? defaultQueryOptions.name : query.name,
    in: 'query',
    ...omit(query, 'enum'),
    type,
  };

  if (isEnumArray(query)) {
    addEnumArraySchema(param, query);
  } else if (isEnumDefined(query)) {
    addEnumSchema(param, query);
  }

  if (!query.required) {
    param.required = false;
  }

  if (isArray) {
    param.isArray = isArray;
  }

  return {
    metadata: param,
    initial: defaultQueryOptions,
  };
};

export const createBody = (body: ApiBodyOptions): ParamDecorators => {
  const [type, isArray] = getTypeIsArrayTuple(
    (body as ApiBodyMetadata).type,
    (body as ApiBodyMetadata).isArray as boolean
  );
  const param: ApiBodyMetadata & Record<string, any> = {
    in: 'body',
    ...omit(body, 'enum'),
    type,
    isArray,
  };

  if (isEnumArray(body)) {
    addEnumArraySchema(param, body);
  } else if (isEnumDefined(body)) {
    addEnumSchema(param, body);
  }

  return {
    metadata: param,
    initial: defaultBodyMetadata,
  };
};
