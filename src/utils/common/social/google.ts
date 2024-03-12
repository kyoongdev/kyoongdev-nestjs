import { Inject, Injectable } from '@nestjs/common';

import axios from 'axios';
import type { Response } from 'express';

import type { GoogleConfig, GoogleGetRestCallback, GoogleUser } from '../../interface/social.interface';

import { GOOGLE_CONFIG, GOOGLE_URL } from './constant';

@Injectable()
export class GoogleLogin {
  constructor(@Inject(GOOGLE_CONFIG) private readonly props: GoogleConfig | null) {}

  public getRest(res: Response, redirectUrl?: string) {
    if (!this.props?.redirectUri && !redirectUrl) {
      throw { status: 500, message: 'Google Redirect Url is not defined' };
    }

    if (!this.props?.clientId) {
      throw { status: 500, message: 'Google Client Id is not defined' };
    }

    res.redirect(GOOGLE_URL.AUTH(this.props?.clientId, redirectUrl ?? this.props.redirectUri!));
  }

  public async getToken(code: string): Promise<string | undefined> {
    if (!this.props?.clientSecret || !this.props?.redirectUri || !this.props?.clientId)
      throw { status: 500, message: 'Google Client Secret or Redirect Url or ClientId is not defined' };

    const data = {
      client_id: this.props.clientId,
      client_secret: this.props.clientSecret,
      redirect_uri: this.props.redirectUri,
      grant_type: 'authorization_code',
      code,
    };

    try {
      const response = await axios.post(GOOGLE_URL.TOKEN, data);

      return response.data?.access_token;
    } catch (error) {
      return undefined;
    }
  }

  static async getAppUser(token: string): Promise<GoogleUser | undefined> {
    try {
      const response = await axios.get(GOOGLE_URL.USER_APP(token));
      const { id, email, name: nickname, picture: profileImage } = response.data;

      return {
        id,
        email,
        nickname,
        profileImage,
      };
    } catch (error: any) {
      const { response } = error;
      if (response.data.error === 'invalid_token') throw { status: 403, message: 'GOOGLE_TOKEN_EXPIRED' };
      return undefined;
    }
  }

  static async getWebUser(token: string) {
    try {
      const response = await axios.get(`${GOOGLE_URL.USER_WEB}?access_token=${token}`, {});

      const { id, email, name: nickname, picture: profileImage } = response.data;
      return {
        id,
        email,
        nickname,
        profileImage,
      };
    } catch (error: any) {
      const { response } = error;

      if (response.data.error === 'invalid_token') throw { status: 403, message: 'GOOGLE_TOKEN_EXPIRED' };
      return undefined;
    }
  }
  public async getRestCallback(code: string): Promise<GoogleGetRestCallback | undefined> {
    try {
      const token = await this.getToken(code);
      if (!token) {
        throw { status: 500, message: '구글 유저정보 발급 오류!' };
      }
      const user = await GoogleLogin.getWebUser(token);

      if (!user) {
        throw { status: 500, message: '구글 유저정보 발급 오류!' };
      }

      return { token: code, user };
    } catch (error: any) {
      return undefined;
    }
  }
}
