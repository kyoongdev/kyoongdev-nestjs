import type { Response } from 'express';
import type { GoogleConfig, GoogleGetRestCallback, GoogleUser } from './type';
export declare class GoogleLogin {
    private readonly props;
    constructor(props: GoogleConfig | null);
    getRest(res: Response, redirectUrl?: string): void;
    getToken(code: string): Promise<string | undefined>;
    static getAppUser(token: string): Promise<GoogleUser | undefined>;
    static getWebUser(token: string): Promise<{
        id: any;
        email: any;
        nickname: any;
        profileImage: any;
    } | undefined>;
    getRestCallback(code: string): Promise<GoogleGetRestCallback | undefined>;
}
