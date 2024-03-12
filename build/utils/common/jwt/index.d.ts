import { ConfigService } from '@nestjs/config';
import type { SignOptions, VerifyOptions } from 'jsonwebtoken';
export declare class JwtProvider {
    private readonly configService;
    private readonly accessTokenExpiresIn;
    private readonly refreshTokenExpiresIn;
    constructor(configService: ConfigService);
    signJwt<T extends object>(value: T, options?: SignOptions): string;
    verifyJwt<T = any>(token: string, options?: VerifyOptions): T | any;
    createTokens<T extends object>(value: T, options?: SignOptions): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
