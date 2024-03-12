import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import type { SignOptions, VerifyOptions } from 'jsonwebtoken';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { nanoid } from 'nanoid';

@Injectable()
export class JwtProvider {
  private readonly accessTokenExpiresIn: string = '2h' as const;
  private readonly refreshTokenExpiresIn: string = '14d' as const;

  constructor(private readonly configService: ConfigService) {
    if (configService.get('ACCESS_TOKEN_EXPIRES_IN')) {
      this.accessTokenExpiresIn = configService.get('ACCESS_TOKEN_EXPIRES_IN') as string;
    }
    if (configService.get('REFRESH_TOKEN_EXPIRES_IN')) {
      this.accessTokenExpiresIn = configService.get('REFRESH_TOKEN_EXPIRES_IN') as string;
    }
  }

  signJwt<T extends object>(value: T, options?: SignOptions): string {
    try {
      if (typeof value !== 'string' && typeof value !== 'object' && !Buffer.isBuffer(value)) {
        throw { status: 400, message: 'BadRequest Payload' };
      }

      return jwt.sign(value, this.configService.get<string>('JWT_KEY') as string, options ?? {});
    } catch (error) {
      throw new JsonWebTokenError('sign Failed');
    }
  }

  verifyJwt<T = any>(token: string, options?: VerifyOptions): T | any {
    try {
      return jwt.verify(token, this.configService.get<string>('JWT_KEY') as string, options ?? {}) as T;
    } catch (error) {
      throw new JsonWebTokenError('sign Failed');
    }
  }

  async createTokens<T extends object>(value: T, options?: SignOptions) {
    const key = nanoid();

    const accessToken = this.signJwt<T>({ ...value, key }, { ...options, expiresIn: this.accessTokenExpiresIn });
    const refreshToken = this.signJwt<T>({ ...value, key }, { ...options, expiresIn: this.refreshTokenExpiresIn });

    return { accessToken, refreshToken };
  }
}
