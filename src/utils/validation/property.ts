import { ApiPropertyOptional, ApiPropertyOptions } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { DECORATORS, getEnumType, getEnumValues, getTypeIsArrayTuple, isEnumArray } from '../swagger';
import type { Property as PropertyProps } from './property-type';
import { createPropertyDecorator } from './property-utils';

export const ToBoolean = () => {
  const toPlain = Transform(
    ({ value }) => {
      return value;
    },
    {
      toPlainOnly: true,
    }
  );
  const toClass = (target: any, key: string) => {
    return Transform(
      ({ obj }) => {
        return valueToBoolean(obj[key]);
      },
      {
        toClassOnly: true,
      }
    )(target, key);
  };
  return function (target: any, key: string) {
    toPlain(target, key);
    toClass(target, key);
  };
};

const valueToBoolean = (value: any) => {
  if (value === null || value === undefined) {
    return undefined;
  }
  if (typeof value === 'boolean') {
    return value;
  }
  if (['true', 'on', 'yes', '1'].includes(value.toLowerCase())) {
    return true;
  }
  if (['false', 'off', 'no', '0'].includes(value.toLowerCase())) {
    return false;
  }
  return value;
};

export const Property = ({ apiProperty = {}, validation, overrideExisting, typeOptions = {} }: PropertyProps) => {
  const [type, isArray] = getTypeIsArrayTuple(apiProperty.type, apiProperty.isArray ?? false);
  apiProperty = {
    ...apiProperty,
    type,
    isArray,
  };

  if (apiProperty.nullable && typeof apiProperty.type === 'string' && !apiProperty.example) {
    apiProperty.example = `${apiProperty.type} | null`;
  }

  apiProperty.required = !apiProperty.nullable;

  if (isEnumArray(apiProperty)) {
    apiProperty.type = 'array';

    const enumValues = getEnumValues(apiProperty.enum);
    apiProperty.items = {
      type: getEnumType(enumValues),
      enum: enumValues,
    };

    delete apiProperty.enum;
  } else if ((apiProperty as ApiPropertyOptions).enum) {
    const enumValues = getEnumValues((apiProperty as ApiPropertyOptions).enum);

    (apiProperty as ApiPropertyOptions).enum = enumValues;
    (apiProperty as ApiPropertyOptions).type = getEnumType(enumValues);
  }

  if (Array.isArray(apiProperty.type) || isArray) {
    apiProperty.example = apiProperty.example
      ? apiProperty.example
      : `${apiProperty.type}[] ${apiProperty.nullable ? '| null' : ''}`;
  }

  return createPropertyDecorator(
    DECORATORS.API_MODEL_PROPERTIES,
    apiProperty,
    overrideExisting,
    typeOptions,
    validation
  );
};
