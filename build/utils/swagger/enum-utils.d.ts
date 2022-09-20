import type { SchemaObjectMetadata } from '@nestjs/swagger/dist/interfaces/schema-object-metadata.interface';
import type { SwaggerEnumType } from '@nestjs/swagger/dist/types/swagger-enum.type';
export declare function getEnumValues(enumType?: SwaggerEnumType): string[] | number[];
export declare function getEnumType(values: (string | number)[]): 'string' | 'number';
export declare function addEnumArraySchema(paramDefinition: Partial<Record<'schema' | 'isArray' | 'enumName', any>>, decoratorOptions: Partial<Record<'enum' | 'enumName', any>>): void;
export declare function addEnumSchema(paramDefinition: Partial<Record<string, any>>, decoratorOptions: Partial<Record<string, any>>): void;
export declare const isEnumArray: <T extends Partial<Record<"isArray" | "enum", any>>>(obj: Record<string, any>) => obj is T;
export declare const isEnumDefined: <T extends Partial<Record<"enum", any>>>(obj: Record<string, any>) => obj is T;
export declare const isEnumMetadata: (metadata: SchemaObjectMetadata) => any;
