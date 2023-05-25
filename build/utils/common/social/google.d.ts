import type { Response } from 'express';
import type { GoogleConfig, GoogleSocial } from './type-util';
export declare class GoogleLogin {
    private readonly props;
    constructor(props: GoogleConfig | null);
    getRest(res: Response, redirectUrl: string | undefined): void;
    getToken(code: string): Promise<string | undefined>;
    static getAppUser(token: string): Promise<GoogleSocial.User | undefined>;
    static getWebUser(token: string): Promise<{
        id: any;
        email: any;
        nickname: any;
        profileImage: any;
    } | undefined>;
    getRestCallback(code: string): Promise<GoogleSocial.GetRestCallback | undefined>;
}
