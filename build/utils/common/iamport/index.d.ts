import type { Iamport as IamportTypes } from './type';
import { GetRequestCertificationHTML, GetRequestPaymentHTMLProps } from './view';
declare class Iamport {
    private imp_key?;
    private imp_secret?;
    private merchant_id?;
    private pg?;
    constructor({ imp_key, imp_secret, merchant_id, pg }: IamportTypes.Constructor);
    getToken({ imp_key, imp_secret }: IamportTypes.GetToken): Promise<string | null>;
    getPaymentData({ access_token, imp_uid }: IamportTypes.GetPaymentData): Promise<any | null>;
    getPaymentHTML(props: GetRequestPaymentHTMLProps): string | null;
    getPaymentDataWithAccessToken({ imp_key, imp_secret, imp_uid, }: IamportTypes.GetPaymentDataWithAccessToken): Promise<any | string>;
    completePayment({ imp_key, imp_secret, imp_uid, productAmount, }: IamportTypes.CompletePaymentProps): Promise<IamportTypes.CompletePayment>;
    cancelPayment({ imp_key, imp_secret, imp_uid, reason, cancelAmount, }: IamportTypes.CancelPayment): Promise<any | null>;
    getCeritifcationHTMLData(props: GetRequestCertificationHTML): Promise<string | null>;
    getCertificationData({ access_token, imp_uid }: IamportTypes.GetCertificationData): Promise<any | null>;
    getCeritificationDataWithAccessToken({ imp_key, imp_secret, imp_uid, }: IamportTypes.GetCertificationDataWithAccessToken): Promise<any | null>;
}
export { Iamport };
