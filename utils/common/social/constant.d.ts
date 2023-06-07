import type { AppleAuthConfig } from 'apple-auth';
import AppleAuth from 'apple-auth';
export declare const KAKAO_CONFIG: unique symbol;
export declare const GOOGLE_CONFIG: unique symbol;
export declare const APPLE_CONFIG: unique symbol;
export declare const NAVER_CONFIG: unique symbol;
declare const KAKAO_URL: {
    readonly TOKEN: "https://kauth.kakao.com/oauth/token";
    readonly USER: "https://kapi.kakao.com/v2/user/me";
    readonly LOGOUT: "https://kapi.kakao.com/v1/user/logout";
    readonly UNLINK: "https://kapi.kakao.com/v1/user/unlink";
    readonly AUTH: (restKey: string, redirectUrl: string) => string;
};
declare const GOOGLE_URL: {
    readonly TOKEN: "https://oauth2.googleapis.com/token";
    readonly USER_WEB: "https://www.googleapis.com/oauth2/v2/userinfo";
    readonly USER_APP: (id_token: string) => string;
    readonly AUTH: (client_id: string, redirect_uri: string) => string;
};
declare const APPLE_URL: {
    readonly AUTH: (appleConfig: AppleAuthConfig, path: string) => AppleAuth;
};
declare const NAVER_URL: {
    readonly USER: "https://openapi.naver.com/v1/nid/me";
    readonly UNLINK: (client_id: string, client_secret: string, access_token: string) => string;
    readonly TOKEN: (client_id: string, client_secret: string, code: string) => string;
    readonly AUTH: (code: string | number, redirect_uri: string, client_id: string) => string;
};
export { KAKAO_URL, GOOGLE_URL, APPLE_URL, NAVER_URL };
