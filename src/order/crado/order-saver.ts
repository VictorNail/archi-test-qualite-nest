import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Order } from 'src/order/domain/entity/order.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrderSaver {
    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,
    ) {}

    async saveOrder(order: Order): Promise<void> {
        await this.orderRepository.save(order);
    }
}
