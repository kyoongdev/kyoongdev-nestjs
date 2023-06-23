import { DynamicModule } from '@nestjs/common';
import { type LocationProps } from './type';
export declare class SocialLocationModule {
    static forRoot(config?: LocationProps): DynamicModule;
}
