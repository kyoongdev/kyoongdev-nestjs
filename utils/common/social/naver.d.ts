import type { Response } from 'express';
import type { Naver as NaverSocial } from './types';
interface NaverProps {
    clientId: string;
    clientSecret: string | undefined;
    redirectUrl: string | undefined;
}
export type NaverUser = NaverSocial.User;
declare class Naver {
    private clientId;
    private clientSecret;
    private redirectUrl;
    constructor(props: NaverProps);
    getRest(res: Response, code: string, redirectUrl: string | undefined): void;
    static getUser(token: string): Promise<NaverSocial.User | undefined>;
    getToken(code: string): Promise<NaverSocial.Token | undefined>;
    getRestCallback(code: string): Promise<NaverSocial.GetRestCallback | undefined>;
}
export { Naver };
