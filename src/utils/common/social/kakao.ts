/* eslint-disable @typescript-eslint/no-non-null-assertion */
import axios from 'axios';
import queryString from 'query-string';

import type { Response } from 'express';

import { Inject, Injectable } from '@nestjs/common';
import { KAKAO_CONFIG, KAKAO_URL } from './constant';
import type { KakaoConfig, KakaoSocial } from './type-util';

@Injectable()
export class KakaoLogin {
  constructor(@Inject(KAKAO_CONFIG) private readonly props: KakaoConfig | null) {}

  public getRest(res: Response, redirectUrl: string | undefined) {
    if (!this.props?.redirectUrl && !redirectUrl) {
      throw { status: 500, message: 'Kakao Redirect Url is not defined' };
    }

    if (!this.props?.restKey) {
      throw { status: 500, message: 'Kakao Rest Key is not defined' };
    }

    res.redirect(KAKAO_URL.AUTH(this.props.restKey, redirectUrl ?? this.props.redirectUrl!));
  }

  static async getUser(token: string): Promise<KakaoSocial.GetUser | undefined> {
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    };
    try {
      const response = await axios.get(KAKAO_URL.USER, {
        headers,
      });

      const { id, properties, kakao_account: kakaoAccount } = response.data;

      return {
        id,
        kakaoAccount,
        properties,
      };
    } catch (error) {
      return undefined;
    }
  }

  public async getToken(code: string, redirectUrl?: string): Promise<string | undefined> {
    if (!this.props?.restKey || !this.props.secretKey || !this.props.redirectUrl) {
      throw { status: 500, message: 'Kakao config is not defined' };
    }

    const data = queryString.stringify({
      grant_type: 'authorization_code',
      client_id: this.props.restKey,
      client_secret: this.props.secretKey,
      redirectUri: redirectUrl || this.props.redirectUrl,
      code,
    });

    try {
      const response = await axios.post(KAKAO_URL.TOKEN, data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const token = response.data?.access_token;
      return token;
    } catch (error) {
      return undefined;
    }
  }

  public async getRestCallback(code: string): Promise<KakaoSocial.GetRestCallback | undefined> {
    try {
      const token = await this.getToken(code);
      if (!token) {
        throw { status: 400, message: '카카오 토큰 발급 오류!' };
      }

      const user = await KakaoLogin.getUser(token);
      if (!user) {
        throw { status: 500, message: '카카오 유저정보 발급 오류!' };
      }

      return { token, user };
    } catch (error) {
      return undefined;
    }
  }

  public async logout(id: string, adminKey?: string): Promise<boolean> {
    try {
      if (!adminKey && !this.props?.adminKey) {
        throw { status: 500, message: '카카오 어드민키가 없습니다.' };
      }

      const headers = {
        Authorization: `KakaoAK ${adminKey ?? this.props?.adminKey}`,
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      };

      const data = queryString.stringify({
        target_id_type: 'user_id',
        target_id: id,
      });

      await axios.post(KAKAO_URL.LOGOUT, data, { headers });

      return true;
    } catch (err: any) {
      return false;
    }
  }
}
