import type { Response } from 'express';
import type { KakaoConfig, KakaoSocial } from './type-util';
export declare class KakaoLogin {
    private readonly props;
    constructor(props: KakaoConfig | null);
    getRest(res: Response, redirectUrl: string | undefined): void;
    static getUser(token: string): Promise<KakaoSocial.GetUser | undefined>;
    getToken(code: string, redirectUrl?: string): Promise<string | undefined>;
    getRestCallback(code: string): Promise<KakaoSocial.GetRestCallback | undefined>;
    logout(id: string, adminKey?: string): Promise<boolean>;
}
