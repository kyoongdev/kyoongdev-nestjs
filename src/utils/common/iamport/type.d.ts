export namespace Iamport {
  export interface Constructor {
    imp_key?: string;
    imp_secret?: string;
    merchant_id?: string; // imp00000000
    pg?: string; //tosstest
  }

  export type GetToken = Constructor;

  export interface GetPaymentData {
    access_token: string;
    imp_uid: string;
  }

  export interface GetPaymentDataWithAccessToken extends GetToken {
    imp_uid: string;
  }

  export interface CompletePaymentProps extends GetPaymentDataWithAccessToken {
    productAmount: string | number;
  }

  export type CompletePayment = {
    status: number;
    message: string;
    completeStatus?: string;
    data?: any;
  };

  export interface CancelPayment extends GetPaymentDataWithAccessToken {
    reason?: string;
    cancelAmount: string | number;
  }

  export interface GetCertificationData {
    access_token: string;
    imp_uid: string;
  }

  export interface GetCertificationDataWithAccessToken {
    imp_key?: string;
    imp_secret?: string;
    imp_uid: string;
  }
}
