import { DynamicModule } from '@nestjs/common';
import type { SocialConfig } from './type';
export declare class SocialLoginModule {
    static forRoot(config?: SocialConfig): DynamicModule;
    private static createKakaoConfig;
    private static createAppleConfig;
    private static createGoogleConfig;
    private static createNaverConfig;
}
