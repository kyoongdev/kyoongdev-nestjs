import type { SwaggerOptions } from './decorator-type';
import { ApiResponseOptions } from './decorator-type';
export declare const RequestApi: (swaggerOptions: SwaggerOptions) => MethodDecorator;
export declare const ResponseApi: (options: ApiResponseOptions & {
    isPaging?: boolean;
}) => MethodDecorator & ClassDecorator;
export declare const ApiFile: (fieldName?: string) => <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol | undefined, descriptor?: TypedPropertyDescriptor<Y> | undefined) => void;
export declare const Auth: (guard: Function, name?: string) => <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol | undefined, descriptor?: TypedPropertyDescriptor<Y> | undefined) => void;
