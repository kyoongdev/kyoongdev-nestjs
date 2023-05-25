import type { AppleAuthConfig } from 'apple-auth';
import type { Response } from 'express';
import type { Apple as AppleTypes } from './types';
interface AppleConfig {
  appleConfig: AppleAuthConfig;
  path: string;
}
export type AppleUser = AppleTypes.User;
declare class AppleLogin {
  private appleAuth;
  constructor(props: AppleConfig);
  getRest(res: Response): void;
  static getUser(id_token: string): Promise<AppleTypes.User | undefined>;
  getRestCallback(code: string): Promise<AppleTypes.User | undefined>;
}
export { AppleLogin };
