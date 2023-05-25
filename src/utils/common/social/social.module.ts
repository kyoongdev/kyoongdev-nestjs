import { DynamicModule, Module, Provider } from '@nestjs/common';
import { AppleLogin } from './apple';
import { APPLE_CONFIG, GOOGLE_CONFIG, KAKAO_CONFIG, NAVER_CONFIG } from './constant';
import { GoogleLogin } from './google';
import { KakaoLogin } from './kakao';
import { NaverLogin } from './naver';
import type { AppleConfig, GoogleConfig, KakaoConfig, NaverConfig, SocialConfig } from './type-util';

@Module({
  providers: [KakaoLogin, AppleLogin, GoogleLogin, NaverLogin],
  exports: [KakaoLogin, AppleLogin, GoogleLogin, NaverLogin],
})
export class SocialLoginModule {
  static forFeature(config: SocialConfig = {}): DynamicModule {
    const providers: Provider[] = this.createConfig(config);

    return {
      module: SocialLoginModule,
      providers,
      exports: providers,
    };
  }

  private static createConfig(config: SocialConfig = {}) {
    const providers: Provider[] = [];
    if (config.kakao) providers.push(this.createKakaoConfig(config.kakao));
    if (config.apple) providers.push(this.createAppleConfig(config.apple));
    if (config.google) providers.push(this.createGoogleConfig(config.google));
    if (config.naver) providers.push(this.createNaverConfig(config.naver));
    return providers;
  }

  private static createKakaoConfig(kakao: KakaoConfig): Provider {
    return {
      provide: KAKAO_CONFIG,
      useValue: kakao,
    };
  }

  private static createAppleConfig(apple: AppleConfig): Provider {
    return {
      provide: APPLE_CONFIG,
      useValue: apple,
    };
  }

  private static createGoogleConfig(google: GoogleConfig): Provider {
    return {
      provide: GOOGLE_CONFIG,
      useValue: google,
    };
  }

  private static createNaverConfig(naver: NaverConfig): Provider {
    return {
      provide: NAVER_CONFIG,
      useValue: naver,
    };
  }
}
