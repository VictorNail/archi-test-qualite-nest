import {Order} from "../entity/order.entity";
import {OrderRepositoryInterface} from "../port/order.repository.interface";
import {NotFoundException} from "@nestjs/common";

export default class DeliveryOrderService {

    constructor(private readonly orderRepository: OrderRepositoryInterface) {
    }
    public async deliveryOrder(orderId: string, newDate: Date): Promise<Order> {
        const orderDelivered: Order = await this.orderRepository.findById(orderId);
        if (!orderDelivered) {
            throw new NotFoundException(Order.MESSAGE_NOT_FOUND_ORDER);
        }
        orderDelivered.isDelivery(newDate);
        return orderDelivered;
    }

}