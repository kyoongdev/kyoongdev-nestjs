import { DynamicModule } from '@nestjs/common';
import type { SocialConfig } from './type-util';
export declare class SocialLoginModule {
    static forFeature(config?: SocialConfig): DynamicModule;
    private static createConfig;
    private static createKakaoConfig;
    private static createAppleConfig;
    private static createGoogleConfig;
    private static createNaverConfig;
}
