import { DynamicModule, Module, type Provider } from '@nestjs/common';

import { Location } from './location';
import { type LocationProps } from './type';

export const LOCATION_CONFIG = Symbol('LOCATION_CONFIG');

@Module({
  providers: [Location],
  exports: [Location],
})
export class LocationModule {
  static forRoot(config: LocationProps = {}): DynamicModule {
    const providers: Provider[] = [
      {
        provide: LOCATION_CONFIG,
        useValue: config || null,
      },
    ];
    return {
      module: LocationModule,
      providers,
      exports: providers,
    };
  }
}
