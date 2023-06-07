import { DynamicModule } from '@nestjs/common';
import { type LocationProps } from './type';
export declare const LOCATION_CONFIG: unique symbol;
export declare class LocationModule {
    static forRoot(config?: LocationProps): DynamicModule;
}
