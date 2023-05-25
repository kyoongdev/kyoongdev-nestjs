import type { AppleAuthConfig } from 'apple-auth';
import type { Apple as AppleTypes, Google as GoogleSocial, Kakao as KakaoSocial, Naver as NaverSocial } from './types';
export interface NaverConfig {
    clientId: string;
    clientSecret: string | undefined;
    redirectUrl: string | undefined;
}
export type NaverUser = NaverSocial.User;
export interface AppleConfig {
    appleConfig: AppleAuthConfig;
    path: string;
}
export type AppleUser = AppleTypes.User;
export interface GoogleConfig {
    clientId: string;
    clientSecret: string | undefined;
    redirectUri: string | undefined;
}
export type GoogleUser = GoogleSocial.User;
export interface KakaoConfig {
    restKey: string;
    secretKey: string | undefined;
    redirectUrl: string | undefined;
    adminKey: string | undefined;
}
export type KakaoUser = KakaoSocial.User;
export interface SocialConfig {
    kakao?: KakaoConfig;
    google?: GoogleConfig;
    naver?: NaverConfig;
    apple?: AppleConfig;
}
export { NaverSocial, KakaoSocial, GoogleSocial };
