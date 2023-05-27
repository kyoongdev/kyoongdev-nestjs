import type { Response } from 'express';
import type { KakaoConfig, KakaoGetRestCallback, KakaoGetUser } from './type';
export declare class KakaoLogin {
    private readonly props;
    constructor(props: KakaoConfig | null);
    getRest(res: Response, redirectUrl?: string): void;
    static getUser(token: string): Promise<KakaoGetUser | undefined>;
    getToken(code: string, redirectUrl?: string): Promise<string | undefined>;
    getRestCallback(code: string): Promise<KakaoGetRestCallback | undefined>;
    logout(id: string, adminKey?: string): Promise<boolean>;
}
