
import { NotFoundException } from '@nestjs/common';
import {Order} from "../../entity/order.entity";
import {OrderRepositoryInterface} from "../../port/order.repository.interface";
import CancelOrderService from "../../use-case/order/cancel-order.service";

class OrderRepositoryFake {
    async findById(id: string): Promise<Order | null> {
        return null;
    }

    async save(order: Order): Promise<Order> {
        return order;
    }
}

const orderRepositoryFake =
    new OrderRepositoryFake() as OrderRepositoryInterface;

describe('CancelOrderService', () => {
    it('should throw an error if the order is not found', async () => {
        const cancelOrderService = new CancelOrderService(orderRepositoryFake);

        await expect(
            cancelOrderService.cancelOrder('order-id', 'Client requested cancellation'),
        ).rejects.toThrow(NotFoundException);
    });
});
