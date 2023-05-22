import { ApiBodyOptions, ApiHeaderOptions, ApiParamOptions, ApiQueryOptions } from '@nestjs/swagger';
import { ParamDecorators } from './decorator-type';
export declare function getTypeIsArrayTuple(input: Function | [Function] | undefined | string | Record<string, any>, isArrayFlag?: boolean): [Function | undefined, boolean];
export declare const createParam: (params: ApiParamOptions) => ParamDecorators;
export declare const createHeader: (headers: ApiHeaderOptions) => ParamDecorators;
export declare const createQuery: (query: ApiQueryOptions) => ParamDecorators;
export declare const createBody: (body: ApiBodyOptions) => ParamDecorators;
