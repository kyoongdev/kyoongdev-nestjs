import type { ApiPropertyOptions } from '@nestjs/swagger';
import { TypeOptions } from 'class-transformer';
import { ValidationArguments, ValidationOptions } from 'class-validator';

export interface Validate {
  apiProperty: ApiPropertyOptions;
  validation?: ValidationOptions;
  typeOptions?: TypeOptions;
}

export interface ValidateOptions {
  name: string;
  constraints?: any[];
  validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> | boolean;
  defaultMessage?(validationArguments?: ValidationArguments): string;
}
