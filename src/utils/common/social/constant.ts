import type { AppleAuthConfig } from 'apple-auth';
import AppleAuth from 'apple-auth';
import queryString from 'query-string';

export const KAKAO_CONFIG = Symbol('KAKAO_CONFIG');
export const GOOGLE_CONFIG = Symbol('GOOGLE_CONFIG');
export const APPLE_CONFIG = Symbol('APPLE_CONFIG');
export const NAVER_CONFIG = Symbol('NAVER_CONFIG');

const KAKAO_URL = {
  TOKEN: 'https://kauth.kakao.com/oauth/token',
  USER: 'https://kapi.kakao.com/v2/user/me',
  LOGOUT: 'https://kapi.kakao.com/v1/user/logout',
  UNLINK: 'https://kapi.kakao.com/v1/user/unlink',
  AUTH(restKey: string, redirectUrl: string) {
    return `https://kauth.kakao.com/oauth/authorize?client_id=${restKey}&redirect_uri=${redirectUrl}&response_type=code`;
  },
} as const;

const GOOGLE_URL = {
  TOKEN: 'https://oauth2.googleapis.com/token',
  USER_WEB: 'https://www.googleapis.com/oauth2/v2/userinfo',
  USER_APP(id_token: string) {
    return 'https://oauth2.googleapis.com/tokeninfo?id_token=' + id_token;
  },
  AUTH(client_id: string, redirect_uri: string) {
    const GOOGLE_AUTH_URL_PARAMS = queryString.stringify({
      client_id,
      redirect_uri,
      scope: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
      ].join(' '),
      response_type: 'code',
      access_type: 'offline',
      prompt: 'consent',
    });

    return `https://accounts.google.com/o/oauth2/auth?${GOOGLE_AUTH_URL_PARAMS}`;
  },
} as const;

const APPLE_URL = {
  AUTH(appleConfig: AppleAuthConfig, path: string): AppleAuth {
    return new AppleAuth(appleConfig, path, 'text');
  },
} as const;

const NAVER_URL = {
  USER: 'https://openapi.naver.com/v1/nid/me',
  UNLINK(client_id: string, client_secret: string, access_token: string) {
    const data = queryString.stringify({
      grant_type: 'delete',
      client_id,
      client_secret,
      access_token,
    });

    return `https://nid.naver.com/oauth2.0/token?${data}`;
  },
  TOKEN(client_id: string, client_secret: string, code: string) {
    const data = queryString.stringify({
      grant_type: 'authorization_code',
      client_id,
      client_secret,
      code,
    });

    return `https://nid.naver.com/oauth2.0/token?${data}`;
  },
  AUTH(code: string | number, redirect_uri: string, client_id: string) {
    return `https://nid.naver.com/oauth2.0/authorize?response_type=code&state=${code}&redirect_url=${redirect_uri}&client_id=${client_id}`;
  },
} as const;

export { KAKAO_URL, GOOGLE_URL, APPLE_URL, NAVER_URL };
