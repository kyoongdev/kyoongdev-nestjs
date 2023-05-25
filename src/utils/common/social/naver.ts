/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import type { Response } from 'express';
import { NAVER_CONFIG, NAVER_URL } from './constant';
import type { NaverConfig, NaverGetRestCallback, NaverToken, NaverUser } from './type';

@Injectable()
class NaverLogin {
  constructor(@Inject(NAVER_CONFIG) private readonly props: NaverConfig | null) {}

  public getRest(res: Response, code: string, redirectUrl?: string) {
    if (!this.props?.redirectUrl && !redirectUrl) throw { status: 500, message: 'Naver Redirect Url is not defined' };

    if (!this.props?.clientId) throw { status: 500, message: 'Naver Client Id is not defined' };

    res.redirect(NAVER_URL.AUTH(code, redirectUrl ?? this.props.redirectUrl!, this.props.clientId));
  }

  static async getUser(token: string): Promise<NaverUser | undefined> {
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    };

    try {
      const response = await axios.get(NAVER_URL.USER, { headers });
      const { response: naverResponse } = response.data;

      const { id, email, gender, age, mobile: phoneNumber } = naverResponse;

      return {
        id,
        email,
        gender,
        age,
        phoneNumber,
      };
    } catch (err) {
      return undefined;
    }
  }

  public async getToken(code: string): Promise<NaverToken | undefined> {
    try {
      if (!this.props?.clientSecret) throw { status: 500, message: 'Naver Client Secret is not defined' };
      if (!this.props?.clientId) throw { status: 500, message: 'Naver Client Id is not defined' };

      const response = await axios.get(NAVER_URL.TOKEN(code, this.props.clientId, this.props.clientSecret));
      const { access_token: token, token_type: tokenType } = response.data;

      return { token, tokenType };
    } catch (err) {
      return undefined;
    }
  }

  public async getRestCallback(code: string): Promise<NaverGetRestCallback | undefined> {
    try {
      const tokenInfo = await this.getToken(code);

      if (!tokenInfo) {
        throw { status: 400, message: '네이버 토큰 발급 오류!' };
      }

      const user = await NaverLogin.getUser(tokenInfo.token);
      if (!user) {
        throw { status: 500, message: '네이버 유저정보 발급 오류!' };
      }

      return { ...tokenInfo, user };
    } catch (error) {
      return undefined;
    }
  }
}

export { NaverLogin };
