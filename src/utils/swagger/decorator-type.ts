import type { Type } from '@nestjs/common';
import type { ApiBodyOptions, ApiHeaderOptions, ApiParamOptions, ApiQueryOptions } from '@nestjs/swagger';
import type {
  ParameterObject,
  ReferenceObject,
  RequestBodyObject,
  ResponseObject,
  SchemaObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import type { SwaggerEnumType } from '@nestjs/swagger/dist/types/swagger-enum.type';

export interface SwaggerOptions {
  headers?: ApiHeaderOptions | ApiHeaderOptions[];
  params?: ApiParamOptions | ApiParamOptions[];
  query?: ApiQueryOptions | ApiQueryOptions[];
  body?: ApiBodyOptions;
}

type RequestBodyOptions = Omit<RequestBodyObject, 'content'>;
export interface ApiBodyMetadata extends RequestBodyOptions {
  type?: Type<unknown> | Function | [Function] | string;
  isArray?: boolean;
  enum?: SwaggerEnumType;
}

type ParameterOptions = Omit<ParameterObject, 'in' | 'schema'>;

export interface ApiParamMetadata extends ParameterOptions {
  type?: Type<unknown> | Function | [Function] | string;
  format?: string;
  enum?: SwaggerEnumType;
  enumName?: string;
}

type ParameterQueryOptions = Omit<ParameterObject, 'in' | 'schema' | 'name'>;

export interface ApiQueryMetadata extends ParameterQueryOptions {
  name?: string;
  type?: Type<unknown> | Function | [Function] | string;
  isArray?: boolean;
  enum?: SwaggerEnumType;
  enumName?: string;
}

export type ParamDecorators<T extends Record<string, any> = any> = {
  metadata: T;
  initial: Partial<T>;
};

export type ClassDecorators<T extends Array<any> = any> = {
  metakey: string;
  metadata: T[];
}[];

export type ParameterLocation = 'query' | 'header' | 'path' | 'cookie';

export const defaultBodyMetadata: ApiBodyMetadata = {
  type: String,
  required: true,
};

export const defaultParamOptions: ApiParamOptions = {
  name: '',
  required: true,
};

export const defaultQueryOptions: ApiQueryOptions = {
  name: '',
  required: true,
};

export const defaultHeaderOptions: Partial<ApiHeaderOptions> = {
  name: '',
};

export interface ApiResponseMetadata extends Omit<ResponseObject, 'description'> {
  status?: number | 'default';
  type?: Type<unknown> | Function | [Function] | string;
  isArray?: boolean;
  description?: string;
}

export interface ApiResponseSchemaHost extends Omit<ResponseObject, 'description'> {
  schema: SchemaObject & Partial<ReferenceObject>;
  status?: number;
  description?: string;
}

export type ApiResponseOptions = ApiResponseMetadata | ApiResponseSchemaHost;
