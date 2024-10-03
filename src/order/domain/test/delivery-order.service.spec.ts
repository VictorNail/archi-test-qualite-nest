import { NotFoundException } from '@nestjs/common';
import {OrderRepositoryInterface} from "../port/order.repository.interface";
import DeliveryOrderService from "../use-case/delivery-order.service";
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
;

describe('SetShippingAddressOrderService', () => {
    it('should throw an error if the order is not found', async () => {
        const setShippingAddressOrderService = new DeliveryOrderService(
            orderRepositoryFake,
        );

        await expect(
            setShippingAddressOrderService.deliveryOrder("new-id",new Date()),
        ).rejects.toThrow(NotFoundException);
    });
});
