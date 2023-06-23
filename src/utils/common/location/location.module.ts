import { DynamicModule, Module, type Provider } from '@nestjs/common';

import { LOCATION_CONFIG } from './constants';
import { SocialLocationService } from './location';
import { type LocationProps } from './type';

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
