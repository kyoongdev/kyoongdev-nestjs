import type { AppleAuthConfig } from 'apple-auth';

export interface AppleUser {
  id: string;
  email?: string;
}

export interface NaverUser {
  id: string;
  email?: string;
  gender?: string;
  age?: string;
  phoneNumber?: string;
}

export interface NaverToken {
  token: string;
  tokenType: string;
}

export interface NaverGetRestCallback extends NaverToken {
  user: NaverUser;
}

export interface GoogleUser {
  id: string;
  email?: string;
  nickname?: string;
  profileImage?: string;
}

export interface GoogleGetRestCallback {
  token: string;
  user: GoogleUser;
}

export interface KakaoUser {
  id: string;
  email?: string;
  nickname?: string;
  profileImage?: string;
}
export interface KakaoGetUserWithToken {
  status: number;
  message: string;
  data?: { token: string; user: KakaoUser };
}
export interface KakaoProfile {
  nickname?: string;
  thumbnail_image_url?: string;
  profile_image_url?: string;
  is_default_image?: boolean;
}

export interface KakaoAccount {
  profile?: KakaoProfile;
  name?: string;
  email?: string;
  birthyear?: string;
  birthday?: string;
  gender?: 'female' | 'male';
  phone_number?: string;
  [key: string]: any;
}
export interface KakaoGetUser {
  id: string;
  properties: Pick<KakaoProfile, 'nickname'> & {
    profile_image: string;
    thumbnail_image: string;
  };
  kakaoAccount: KakaoAccount;
}

export interface KakaoGetRestCallback {
  token: string;
  user: KakaoGetUser;
}

export interface NaverConfig {
  clientId: string;
  clientSecret: string | undefined;
  redirectUrl: string | undefined;
}

export interface AppleConfig {
  appleConfig: AppleAuthConfig;
  path: string;
}

export interface GoogleConfig {
  clientId: string;
  clientSecret: string | undefined;
  redirectUri: string | undefined;
}

export interface KakaoConfig {
  restKey: string;
  secretKey: string | undefined;
  redirectUrl: string | undefined;
  adminKey: string | undefined;
}

export interface SocialConfig {
  kakao?: KakaoConfig;
  google?: GoogleConfig;
  naver?: NaverConfig;
  apple?: AppleConfig;
}
