import { TypeOptions } from 'class-transformer';
import { ValidationOptions } from 'class-validator';
export declare function createPropertyDecorator<T extends Record<string, any> = {}>(metakey: string, metadata: T, overrideExisting?: boolean, typeOptions?: TypeOptions, validation?: ValidationOptions): PropertyDecorator;
