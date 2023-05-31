import type { AppleAuthConfig } from 'apple-auth';

export interface AppleUser {
  id: string;
  email?: string;
}

export interface NaverUser {
  id: string;
  name: string;
  email: string;
  gender: 'F' | 'M' | 'U';
  age: string;
  birthday: string;
  profile_image: string;
  birthyear: string;
  mobile: string;
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

export interface KakaoProfile {
  nickname?: string;
  thumbnail_image_url?: string;
  profile_image_url?: string;
  is_default_image?: boolean;
}

export interface KakaoAccount {
  profile?: KakaoProfile;
  name?: string;
  nickname?: string;
  email?: string;
  birthyear?: string;
  birthday?: string;
  gender?: 'female' | 'male';
  phone_number?: string;
  profile_needs_agreement?: boolean;
  profile_nickname_needs_agreement?: boolean;
  profile_image_needs_agreement?: boolean;
  email_needs_agreement?: boolean;
  is_email_valid?: boolean;
  is_email_verified?: boolean;
  age_range_needs_agreement?: boolean;
  age_range?: string;
  birthday_needs_agreement?: boolean;
  birthyear_needs_agreement?: boolean;
  birthday_type?: 'SOLAR' | 'LUNAR';
  gender_needs_agreement?: boolean;
  phone_number_needs_agreement?: boolean;
  ci_needs_agreement?: boolean;
  ci?: string;
  ci_authenticated_at?: Date;
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
