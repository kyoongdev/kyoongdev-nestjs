import type { Response } from 'express';
import type { NaverConfig, NaverSocial } from './type-util';
declare class NaverLogin {
    private readonly props;
    constructor(props: NaverConfig | null);
    getRest(res: Response, code: string, redirectUrl?: string): void;
    static getUser(token: string): Promise<NaverSocial.User | undefined>;
    getToken(code: string): Promise<NaverSocial.Token | undefined>;
    getRestCallback(code: string): Promise<NaverSocial.GetRestCallback | undefined>;
}
export { NaverLogin };
