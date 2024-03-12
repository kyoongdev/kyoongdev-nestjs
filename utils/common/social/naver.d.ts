import type { Response } from 'express';
import type { NaverConfig, NaverGetRestCallback, NaverToken, NaverUser } from '../../interface/social.interface';
declare class NaverLogin {
    private readonly props;
    constructor(props: NaverConfig | null);
    getRest(res: Response, code: string, redirectUrl?: string): void;
    static getUser(token: string): Promise<NaverUser | undefined>;
    getToken(code: string): Promise<NaverToken | undefined>;
    getRestCallback(code: string): Promise<NaverGetRestCallback | undefined>;
}
export { NaverLogin };
