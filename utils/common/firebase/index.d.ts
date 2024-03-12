import { ConfigService } from '@nestjs/config';
import type { TokenMessage as FirebaseMessage } from 'firebase-admin/lib/messaging/messaging-api';
type SendMessageProps = FirebaseMessage;
type SendMessagesProps = Array<SendMessageProps>;
type SendMessageResponse = boolean;
interface SendMessagesResponse {
    success: SendMessageProps[];
    failure: SendMessageProps[];
}
export declare class FirebaseMessaging {
    private readonly configService;
    private app;
    constructor(configService: ConfigService);
    sendMessage({ token, notification }: SendMessageProps): Promise<SendMessageResponse>;
    sendMessages(messages: SendMessagesProps): Promise<SendMessagesResponse>;
}
export {};
