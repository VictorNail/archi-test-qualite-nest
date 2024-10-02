import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Order } from 'src/order/domain/entity/order.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrderRetriever {
    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,
    ) {}

    async retrieveOrder(orderId: string): Promise<Order> {
        const order = await this.orderRepository.findOne({
            where: { id: orderId },
        });
        if (!order) {
            throw new Error(`Order with ID ${orderId} not found`);
        }
        return order;
    }
}