import { AppleLogin } from './apple';
import { GoogleLogin } from './google';
import { KakaoLogin } from './kakao';
import { NaverLogin } from './naver';
import type { AppleUser } from './apple';
import type { GoogleUser } from './google';
import type { KakaoUser } from './kakao';
import type { NaverUser } from './naver';
declare class SocialLogin {
    KakaoLogin: typeof KakaoLogin;
    GoogleLogin: typeof GoogleLogin;
    NaverLogin: typeof NaverLogin;
}
export { SocialLogin, KakaoLogin, GoogleLogin, NaverLogin, AppleLogin };
export type { KakaoUser, GoogleUser, NaverUser, AppleUser };
