import AppleAuth from 'apple-auth';
import type { Response } from 'express';
import type { AppleUser } from './type';
declare class AppleLogin {
    private readonly appleAuth;
    constructor(appleAuth: AppleAuth | null);
    getRest(res: Response): void;
    static getUser(id_token: string): Promise<AppleUser | undefined>;
    getRestCallback(code: string): Promise<AppleUser | undefined>;
}
export { AppleLogin };
