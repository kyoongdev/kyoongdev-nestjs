import type { Property as PropertyProps } from './property-type';
export declare const ToBoolean: () => (target: any, key: string) => void;
export declare const Property: ({ apiProperty, validation, overrideExisting, typeOptions }: PropertyProps) => PropertyDecorator;
