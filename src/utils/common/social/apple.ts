import AppleAuth from 'apple-auth';
import jwt from 'jsonwebtoken';

import { Inject, Injectable } from '@nestjs/common';

import type { Response } from 'express';
import { APPLE_CONFIG } from './constant';
import type { Apple as AppleTypes } from './types';

@Injectable()
class AppleLogin {
  constructor(@Inject(APPLE_CONFIG) private readonly appleAuth: AppleAuth | null) {}

  public getRest(res: Response) {
    if (!this.appleAuth) throw { status: 500, message: '애플 로그인 설정 오류!' };

    res.redirect(this.appleAuth.loginURL());
  }

  static async getUser(id_token: string): Promise<AppleTypes.User | undefined> {
    try {
      const idToken = jwt.decode(id_token) as {
        sub: string;
        email?: string;
      };

      if (!idToken?.sub) return undefined;

      return {
        id: idToken.sub as string,
        email: idToken.email,
      };
    } catch (error) {
      return undefined;
    }
  }

  public async getRestCallback(code: string): Promise<AppleTypes.User | undefined> {
    try {
      const user = await AppleLogin.getUser(code);

      if (!user) throw { status: 500, message: '애플 유저 정보 발급 오류!' };

      return user;
    } catch (err) {
      return undefined;
    }
  }
}

export { AppleLogin };
