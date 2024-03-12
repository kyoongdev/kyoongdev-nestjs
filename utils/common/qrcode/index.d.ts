/// <reference types="node" />
import FormData from 'form-data';
interface QRCodeData {
    qrFormData: FormData;
    base64: Buffer;
}
interface QrCode {
    target: string;
    fileName: string | undefined;
}
interface QrCodesResponse {
    success: Array<QRCodeData>;
    failure: Array<QrCode>;
}
declare class QrCode {
    createQRCodeData(props: QrCode): Promise<QRCodeData | undefined>;
    createQrCodesData(props: Array<QrCode>): Promise<QrCodesResponse>;
}
export { QrCode };
