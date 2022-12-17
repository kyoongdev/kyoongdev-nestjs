import { ApiPropertyOptions } from '@nestjs/swagger';
import { Type as TypeFormer, TypeOptions } from 'class-transformer';
import {
  buildMessage,
  isArray,
  isBoolean,
  isDate,
  isEnum,
  isNumber,
  isObject,
  IsOptional,
  isString,
  IS_ARRAY,
  IS_BOOLEAN,
  IS_DATE,
  IS_ENUM,
  IS_NUMBER,
  IS_OBJECT,
  IS_STRING,
  registerDecorator,
  ValidateByOptions,
  ValidateNested,
  ValidationOptions,
} from 'class-validator';

import { type Validate as ValidateProps, type ValidateOptions } from './validate-type';

export const ValidateOption = (
  options: ValidateByOptions,
  typeOptions: TypeOptions = {},
  apiProperty: ApiPropertyOptions,
  validationOptions?: ValidationOptions
): PropertyDecorator => {
  return function (object: object, propertyName: string): void {
    if (validationOptions?.each && apiProperty.type && typeof apiProperty.type === 'function') {
      //Validate Target
      TypeFormer(() => apiProperty.type as Function, typeOptions)(object, propertyName);
      //ValidateNested
      ValidateNested(validationOptions)(object, propertyName);
    }

    if (apiProperty.nullable) {
      IsOptional(validationOptions)(object, propertyName);
    }

    registerDecorator({
      name: options.name,
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: options.constraints,
      validator: options.validator,
    });
  };
};

export const ValidateByOption = ({ name, validate, defaultMessage }: ValidateOptions): ValidateByOptions => ({
  name,
  validator: {
    validate,
    defaultMessage,
  },
});

export const ValidateApiProperty = ({ apiProperty, validation }: ValidateProps): ValidateByOptions => {
  let validateByOptions: ValidateByOptions | null = null;
  if (apiProperty.isArray) {
    validateByOptions = ValidateByOption({
      name: IS_ARRAY,
      validate: (value, args): boolean => isArray(value),
      defaultMessage: buildMessage((eachPrefix) => eachPrefix + '$property must be an array', validation),
    });
  } else if (typeof apiProperty.type === 'function') {
    validateByOptions = ValidateByOption({
      name: IS_OBJECT,
      validate: (value, args): boolean => isObject(value),
      defaultMessage: buildMessage((eachPrefix) => eachPrefix + '$property must be an object', validation),
    });
  } else if (apiProperty.type === 'number') {
    validateByOptions = ValidateByOption({
      name: IS_NUMBER,
      validate: (value, args): boolean => isNumber(value, args?.constraints?.[0]),
      defaultMessage: buildMessage(
        (eachPrefix) => eachPrefix + '$property must be a number conforming to the specified constraints',
        validation
      ),
    });
  } else if (apiProperty.type === 'boolean') {
    validateByOptions = ValidateByOption({
      name: IS_BOOLEAN,
      validate: (value, args): boolean => isBoolean(value),
      defaultMessage: buildMessage((eachPrefix) => eachPrefix + '$property must be a boolean value', validation),
    });
  } else if (apiProperty.type === 'date') {
    validateByOptions = ValidateByOption({
      name: IS_DATE,
      validate: (value, args): boolean => isDate(value),
      defaultMessage: buildMessage((eachPrefix) => eachPrefix + '$property must be a Date instance', validation),
    });
  } else if (apiProperty.type === 'enum' && apiProperty.enum) {
    validateByOptions = ValidateByOption({
      name: IS_ENUM,
      constraints: [apiProperty.enum],
      validate: (value, args): boolean => isEnum(value, args?.constraints?.[0]),
      defaultMessage: buildMessage((eachPrefix) => eachPrefix + '$property must be a valid enum value', validation),
    });
  } else {
    validateByOptions = ValidateByOption({
      name: IS_STRING,
      validate: (value, args): boolean => isString(value),
      defaultMessage: buildMessage((eachPrefix) => eachPrefix + '$property must be a string', validation),
    });
  }

  if (apiProperty.nullable) {
    validateByOptions.constraints = validateByOptions.constraints
      ? [...validateByOptions.constraints, (object: any, value: any) => value !== null]
      : [(object: any, value: any) => value !== null];
  }

  return validateByOptions as ValidateByOptions;
};

export const Validate = ({ apiProperty, validation, typeOptions }: ValidateProps): PropertyDecorator =>
  ValidateOption(ValidateApiProperty({ apiProperty, validation }), typeOptions, apiProperty, validation);
