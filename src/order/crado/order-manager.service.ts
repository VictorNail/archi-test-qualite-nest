import { Injectable } from '@nestjs/common';
import { OrderRetriever } from './order-retriever';
import { OrderValidator } from './order-validator';
import { EmailSender } from './order-email-sender';
import { SmsSender } from './order-sms-sender';
import { OrderSaver } from './order-saver';

@Injectable()
export class OrderManagerService {
    constructor(
        private readonly orderRetriever: OrderRetriever,
        private readonly orderValidator: OrderValidator,
        private readonly emailSender: EmailSender,
        private readonly smsSender: SmsSender,
        private readonly orderSaver: OrderSaver,
    ) {}

    async processOrder(orderId: string): Promise<void> {
        const order = await this.orderRetriever.retrieveOrder(orderId);

        this.orderValidator.validateOrder(order);

        await this.emailSender.sendConfirmationEmail(order);

        await this.smsSender.sendConfirmationSms(order);

        await this.orderSaver.saveOrder(order);
    }
}
