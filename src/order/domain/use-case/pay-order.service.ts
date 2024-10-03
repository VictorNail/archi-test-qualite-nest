import {Order} from "../entity/order.entity";
import {OrderRepositoryInterface} from "../port/order.repository.interface";
import {NotFoundException} from "@nestjs/common";

export default class PayOrderService{

    constructor(private readonly orderRepository: OrderRepositoryInterface) {}

    public async payOrder(orderId: string): Promise<Order> {
        const orderPayed: Order = await this.orderRepository.findById(orderId);

        if (!orderPayed) {
            throw new NotFoundException(Order.MESSAGE_NOT_FOUND_ORDER);
        }
        orderPayed.isPaid();
        return orderPayed;
    }

}