import AppleAuth from 'apple-auth';
import type { Response } from 'express';
import type { Apple as AppleTypes } from './types';
declare class AppleLogin {
    private readonly appleAuth;
    constructor(appleAuth: AppleAuth | null);
    getRest(res: Response): void;
    static getUser(id_token: string): Promise<AppleTypes.User | undefined>;
    getRestCallback(code: string): Promise<AppleTypes.User | undefined>;
}
export { AppleLogin };
