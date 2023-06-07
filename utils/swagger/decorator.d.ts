import type { SwaggerOptions } from './decorator-type';
import { ApiResponseOptions } from './decorator-type';
import { HttpStatus } from '@nestjs/common';
export declare const RequestApi: (swaggerOptions: SwaggerOptions) => MethodDecorator;
export declare const ResponseApi: (options: ApiResponseOptions & {
    isPaging?: boolean;
}, code?: HttpStatus) => MethodDecorator & ClassDecorator;
export declare const ApiFile: (fieldName?: string) => <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol | undefined, descriptor?: TypedPropertyDescriptor<Y> | undefined) => void;
export declare const Auth: (guards: Function[], name?: string) => <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol | undefined, descriptor?: TypedPropertyDescriptor<Y> | undefined) => void;
