import type { Type } from '@nestjs/common';
import type { ApiBodyOptions, ApiHeaderOptions, ApiParamOptions, ApiQueryOptions } from '@nestjs/swagger';
import type { ParameterObject, ReferenceObject, RequestBodyObject, ResponseObject, SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import type { SwaggerEnumType } from '@nestjs/swagger/dist/types/swagger-enum.type';
export interface SwaggerOptions {
    headers?: ApiHeaderOptions | ApiHeaderOptions[];
    params?: ApiParamOptions | ApiParamOptions[];
    query?: ApiQueryOptions | ApiQueryOptions[];
    body?: ApiBodyOptions;
}
declare type RequestBodyOptions = Omit<RequestBodyObject, 'content'>;
export interface ApiBodyMetadata extends RequestBodyOptions {
    type?: Type<unknown> | Function | [Function] | string;
    isArray?: boolean;
    enum?: SwaggerEnumType;
}
declare type ParameterOptions = Omit<ParameterObject, 'in' | 'schema'>;
export interface ApiParamMetadata extends ParameterOptions {
    type?: Type<unknown> | Function | [Function] | string;
    format?: string;
    enum?: SwaggerEnumType;
    enumName?: string;
}
declare type ParameterQueryOptions = Omit<ParameterObject, 'in' | 'schema' | 'name'>;
export interface ApiQueryMetadata extends ParameterQueryOptions {
    name?: string;
    type?: Type<unknown> | Function | [Function] | string;
    isArray?: boolean;
    enum?: SwaggerEnumType;
    enumName?: string;
}
export declare type ParamDecorators<T extends Record<string, any> = any> = {
    metadata: T;
    initial: Partial<T>;
};
export declare type ClassDecorators<T extends Array<any> = any> = {
    metakey: string;
    metadata: T[];
}[];
export declare type ParameterLocation = 'query' | 'header' | 'path' | 'cookie';
export declare const defaultBodyMetadata: ApiBodyMetadata;
export declare const defaultParamOptions: ApiParamOptions;
export declare const defaultQueryOptions: ApiQueryOptions;
export declare const defaultHeaderOptions: Partial<ApiHeaderOptions>;
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
export declare type ApiResponseOptions = ApiResponseMetadata | ApiResponseSchemaHost;
export {};
