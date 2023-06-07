import { DynamicModule, Module, type Provider } from '@nestjs/common';

import { SocialLocationService } from './location';
import { type LocationProps } from './type';

export const LOCATION_CONFIG = Symbol('LOCATION_CONFIG');

@Module({
  providers: [SocialLocationService],
  exports: [SocialLocationService],
})
export class SocialLocationModule {
  static forRoot(config: LocationProps = {}): DynamicModule {
    const providers: Provider[] = [
      {
        provide: LOCATION_CONFIG,
        useValue: config || null,
      },
    ];
    return {
      module: SocialLocationModule,
      providers,
      exports: providers,
    };
  }
}
