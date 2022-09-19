import type { ApiPropertyOptions } from '@nestjs/swagger';
import type { TypeOptions } from 'class-transformer';
import type { ValidationOptions } from 'class-validator';

export interface Property {
  apiProperty?: ApiPropertyOptions;
  validation?: ValidationOptions;
  overrideExisting?: boolean;
  typeOptions?: TypeOptions;
}
