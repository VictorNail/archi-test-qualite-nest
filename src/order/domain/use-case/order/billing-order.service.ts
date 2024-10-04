import {Order, } from "../../entity/order.entity";
import {OrderRepositoryInterface} from "../../port/order.repository.interface";
import {NotFoundException} from "@nestjs/common";
export default class BillingOrderService {

    constructor(
        private readonly orderRepository: OrderRepositoryInterface
    ) {}

    public async billingOrder(orderId: string, newBillingAddress: string): Promise<Order> {
        const orderBilled: Order = await this.orderRepository.findById(orderId);
        if (!orderBilled) {
            throw new NotFoundException(Order.MESSAGE_NOT_FOUND_ORDER);
        }
        orderBilled.isBilled(newBillingAddress);
        return orderBilled;
    }

}