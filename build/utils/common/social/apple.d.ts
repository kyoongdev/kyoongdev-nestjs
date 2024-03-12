import type { Response } from 'express';
import type { AppleConfig, AppleUser } from '../../interface/social.interface';
declare class AppleLogin {
    private readonly appleConfig;
    private appleAuth;
    constructor(appleConfig: AppleConfig | null);
    private setAppleAuth;
    getRest(res: Response): void;
    static getUser(id_token: string): Promise<AppleUser | undefined>;
    getRestCallback(code: string): Promise<AppleUser | undefined>;
}
export { AppleLogin };
