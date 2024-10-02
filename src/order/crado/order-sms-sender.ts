import { Injectable } from '@nestjs/common';
import * as twilio from 'twilio';
import { Order } from 'src/order/domain/entity/order.entity';

@Injectable()
export class SmsSender {
    private client;

    constructor() {
        const accountSid = 'your_twilio_account_sid';
        const authToken = 'your_twilio_auth_token';
        this.client = twilio(accountSid, authToken);
    }

    async sendConfirmationSms(order: Order): Promise<void> {
        await this.client.messages.create({
            body: `Votre commande numéro ${order.id} a été confirmée.`,
            from: '+1234567890',
            to: order.customerPhoneNumber,
        });
    }
}
