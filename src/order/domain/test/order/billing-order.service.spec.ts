import { NotFoundException } from '@nestjs/common';
import {Order} from "../../entity/order.entity";
import {OrderRepositoryInterface} from "../../port/order.repository.interface";
import BillingOrderService from "../../use-case/order/billing-order.service";

class OrderRepositoryFake {
    async findById(_id: string): Promise<Order | null> {
        return null;
    }

    async save(order: Order): Promise<Order> {
        return order;
    }
}

const orderRepositoryFake =
    new OrderRepositoryFake() as OrderRepositoryInterface;

describe('SetInvoiceAddressOrderService', () => {
    it('should throw an error if the order is not found', async () => {
        const billingOrderService = new BillingOrderService(
            orderRepositoryFake,
        );

        await expect(
            billingOrderService.billingOrder('order-id', 'new address'),
        ).rejects.toThrow(NotFoundException);
    });
});
