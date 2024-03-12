import { DynamicModule, Module, Provider } from '@nestjs/common';
import type {
  AppleConfig,
  GoogleConfig,
  KakaoConfig,
  NaverConfig,
  SocialConfig,
} from '../../interface/social.interface';
import { AppleLogin } from './apple';
import { APPLE_CONFIG, GOOGLE_CONFIG, KAKAO_CONFIG, NAVER_CONFIG } from './constant';
import { GoogleLogin } from './google';
import { KakaoLogin } from './kakao';
import { NaverLogin } from './naver';

@Module({
  providers: [KakaoLogin, AppleLogin, GoogleLogin, NaverLogin],
  exports: [KakaoLogin, AppleLogin, GoogleLogin, NaverLogin],
})
export class SocialLoginModule {
  static forRoot(config: SocialConfig = {}): DynamicModule {
    const providers: Provider[] = [
      this.createAppleConfig(config.apple),
      this.createGoogleConfig(config.google),
      this.createKakaoConfig(config.kakao),
      this.createNaverConfig(config.naver),
    ];

    return {
      module: SocialLoginModule,
      providers,
      exports: providers,
    };
  }

  private static createKakaoConfig(kakao?: KakaoConfig): Provider {
    return {
      provide: KAKAO_CONFIG,
      useValue: kakao || null,
    };
  }

  private static createAppleConfig(apple?: AppleConfig): Provider {
    return {
      provide: APPLE_CONFIG,
      useValue: apple || null,
    };
  }

  private static createGoogleConfig(google?: GoogleConfig): Provider {
    return {
      provide: GOOGLE_CONFIG,
      useValue: google || null,
    };
  }

  private static createNaverConfig(naver?: NaverConfig): Provider {
    return {
      provide: NAVER_CONFIG,
      useValue: naver || null,
    };
  }
}
