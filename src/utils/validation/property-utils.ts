import { TypeOptions } from 'class-transformer';
import { ValidationOptions } from 'class-validator';
import { isUndefined, negate, pickBy } from 'lodash';

import { DECORATORS, METADATA_FACTORY_NAME } from 'utils/swagger';

import { Validate } from './validate-utils';

export function createPropertyDecorator<T extends Record<string, any> = {}>(
  metakey: string,
  metadata: T,
  overrideExisting = true,
  typeOptions: TypeOptions = {},
  validation?: ValidationOptions
): PropertyDecorator {
  return (target: object, propertyKey: string) => {
    const properties = Reflect.getMetadata(DECORATORS.API_MODEL_PROPERTIES_ARRAY, target) || [];

    const key = `:${propertyKey}`;
    if (!properties.includes(key)) {
      Reflect.defineMetadata(DECORATORS.API_MODEL_PROPERTIES_ARRAY, [...properties, `:${propertyKey}`], target);
    }
    const existingMetadata = Reflect.getMetadata(metakey, target, propertyKey);

    if (existingMetadata) {
      const newMetadata = pickBy(metadata, negate(isUndefined));
      const metadataToSave = overrideExisting
        ? {
            ...existingMetadata,
            ...newMetadata,
          }
        : {
            ...newMetadata,
            ...existingMetadata,
          };

      Reflect.defineMetadata(metakey, metadataToSave, target, propertyKey);
    } else {
      const type =
        (target?.constructor as any)?.[METADATA_FACTORY_NAME]?.()[propertyKey]?.type ??
        Reflect.getMetadata('design:type', target, propertyKey);

      Reflect.defineMetadata(
        metakey,
        {
          type,
          ...pickBy(metadata, negate(isUndefined)),
        },
        target,
        propertyKey
      );
    }

    return Validate({ apiProperty: metadata, validation, typeOptions })(target, propertyKey);
  };
}
