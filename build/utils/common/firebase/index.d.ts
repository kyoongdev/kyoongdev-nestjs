import type { TokenMessage as FirebaseMessage } from 'firebase-admin/lib/messaging/messaging-api';
type SendMessageProps = FirebaseMessage;
type SendMessagesProps = Array<SendMessageProps>;
type SendMessageResponse = boolean;
interface SendMessagesResponse {
    success: SendMessageProps[];
    failure: SendMessageProps[];
}
export declare class FirebaseMessaging {
    private app;
    constructor(serviceAccount: any);
    sendMessage({ token, notification }: SendMessageProps): Promise<SendMessageResponse>;
    sendMessages(messages: SendMessagesProps): Promise<SendMessagesResponse>;
}
export {};
