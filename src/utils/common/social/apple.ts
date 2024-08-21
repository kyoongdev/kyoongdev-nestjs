import AppleAuth from 'apple-auth';
import jwt from 'jsonwebtoken';

import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';

import type { Response } from 'express';
import type { AppleConfig, AppleUser, SocialLogin } from '../../interface/social.interface';
import { APPLE_CONFIG } from './constant';

@Injectable()
class AppleLogin implements SocialLogin {
  private appleAuth: AppleAuth;
  constructor(@Inject(APPLE_CONFIG) private readonly appleConfig: AppleConfig | null) {
    this.appleAuth = this.setAppleAuth();
  }
  getToken(code: string, redirectUrl?: string): Promise<string | undefined> {
    throw new Error('Method not implemented.');
  }

  private setAppleAuth() {
    if (!this.appleConfig) {
      throw new InternalServerErrorException('애플 로그인 설정이 없습니다.');
    }

    return new AppleAuth(this.appleConfig?.appleConfig, this.appleConfig?.path, 'test');
  }

  public getRest(res: Response) {
    if (!this.appleConfig) {
      throw new InternalServerErrorException('애플 로그인 설정이 없습니다.');
    }

    res.redirect(this.appleAuth.loginURL());
  }

  public async getUser(id_token: string): Promise<AppleUser | undefined> {
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

  public async getRestCallback(code: string): Promise<AppleUser | undefined> {
    try {
      const user = await this.getUser(code);

      if (!user) throw { status: 500, message: '애플 유저 정보 발급 오류!' };

      return user;
    } catch (err) {
      return undefined;
    }
  }
}

export { AppleLogin };
