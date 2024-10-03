import { NotFoundException } from '@nestjs/common';
import PayOrderService from "../use-case/pay-order.service";
import {OrderRepositoryInterface} from "../port/order.repository.interface";
import {Order} from "../entity/order.entity";

class OrderRepositoryFake {
    async findById(_id: string): Promise<Order | null> {
        return null;
    }

    async save(order: Order): Promise<Order> {
        return order;
    }
}

const orderRepositoryFake = new OrderRepositoryFake() as OrderRepositoryInterface;

describe('PayOrderService', () => {
    it('should throw an error if the order is not found', async () => {
        const payOrderService = new PayOrderService(orderRepositoryFake);

        await expect(payOrderService.payOrder('order-id')).rejects.toThrow(
            NotFoundException,
        );
    });
});
