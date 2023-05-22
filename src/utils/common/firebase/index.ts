import { Injectable } from '@nestjs/common';
import admin from 'firebase-admin';
import type { Notification, TokenMessage as FirebaseMessage } from 'firebase-admin/lib/messaging/messaging-api';

type SendMessageProps = FirebaseMessage;

type SendMessagesProps = Array<SendMessageProps>;

type SendMessageResponse = boolean;

interface SendMessagesResponse {
  success: SendMessageProps[];
  failure: SendMessageProps[];
}

@Injectable()
export class FirebaseMessaging {
  private app: admin.app.App;

  constructor(serviceAccount: any) {
    this.app = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  async sendMessage({ token, notification }: SendMessageProps): Promise<SendMessageResponse> {
    try {
      await this.app.messaging().send({
        token,
        notification,
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  async sendMessages(messages: SendMessagesProps): Promise<SendMessagesResponse> {
    const result: SendMessagesResponse = { success: [], failure: [] };
    for await (const message of messages) {
      const messageResult = await this.sendMessage({
        token: message.token,
        notification: message.notification as Notification,
      });

      if (messageResult) {
        result.success.push(message);
      } else {
        result.failure.push(message);
      }
    }

    return result;
  }
}
