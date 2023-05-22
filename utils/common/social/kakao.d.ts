import type { Response } from 'express';
import type { Kakao as KakaoSocial } from './types';
interface KakaoProps {
    kakaoRestKey: string;
    kakaoSecretKey: string | undefined;
    kakaoAdminKey: string | undefined;
    kakaoRedirectUrl: string | undefined;
}
export type KakaoUser = KakaoSocial.User;
export declare class Kakao {
    private restKey;
    private secretKey;
    private redirectUrl;
    private adminKey;
    constructor(props: KakaoProps);
    getRest(res: Response, redirectUrl: string | undefined): void;
    static getUser(token: string): Promise<KakaoSocial.GetUser | undefined>;
    getToken(code: string, redirectUrl?: string): Promise<string | undefined>;
    getRestCallback(code: string): Promise<KakaoSocial.GetRestCallback | undefined>;
    logout(id: string, adminKey?: string): Promise<boolean>;
}
export {};
