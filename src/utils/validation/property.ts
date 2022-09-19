import type { ApiPropertyOptions } from '@nestjs/swagger';
import { DECORATORS, getEnumType, getEnumValues, getTypeIsArrayTuple, isEnumArray } from 'utils/swagger';
import type { Property as PropertyProps } from './property-type';
import { createPropertyDecorator } from './property-utils';

export const Property = ({ apiProperty = {}, validation, overrideExisting, typeOptions = {} }: PropertyProps) => {
  const [type, isArray] = getTypeIsArrayTuple(apiProperty.type, apiProperty.isArray ?? false);
  apiProperty = {
    ...apiProperty,
    type,
    isArray,
  };

  if (apiProperty.nullable && typeof apiProperty.type === 'string') {
    apiProperty.example = `${apiProperty.type} | null`;
  }

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

  if (Array.isArray(apiProperty.type)) {
    apiProperty.type = 'array';
    apiProperty.items = {
      type: 'array',
      items: {
        type: apiProperty.type[0],
      },
    };
  }

  return createPropertyDecorator(
    DECORATORS.API_MODEL_PROPERTIES,
    apiProperty,
    overrideExisting,
    typeOptions,
    validation
  );
};
