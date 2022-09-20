import { ApiPropertyOptions } from '@nestjs/swagger';
import { TypeOptions } from 'class-transformer';
import { ValidateByOptions, ValidationOptions } from 'class-validator';
import { type Validate as ValidateProps, type ValidateOptions } from './validate-type';
export declare const ValidateOption: (options: ValidateByOptions, typeOptions: TypeOptions | undefined, apiProperty: ApiPropertyOptions, validationOptions?: ValidationOptions) => PropertyDecorator;
export declare const ValidateByOption: ({ name, validate, defaultMessage }: ValidateOptions) => ValidateByOptions;
export declare const ValidateApiProperty: ({ apiProperty, validation }: ValidateProps) => ValidateByOptions;
export declare const Validate: ({ apiProperty, validation, typeOptions }: ValidateProps) => PropertyDecorator;
