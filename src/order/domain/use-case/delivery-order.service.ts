import {Order} from "../entity/order.entity";
import {OrderItem} from "../entity/order-item.entity";
import {NotFoundException} from "@nestjs/common";
import OrderRepository from "../../infrastructure/order.repository";
import {OrderRepositoryInterface} from "../port/order.repository.interface";

export default class DeliveryOrderService {

    constructor(private readonly orderRepository: OrderRepositoryInterface) {
    }
    public async deliveryOrder(orderId: string): Promise<Order> {
        const orderDelivered: Order = await this.orderRepository.getOrderById(orderId);
        orderDelivered.isDelivery(new Date());
        return orderDelivered;
    }

}