import {Order} from "../entity/order.entity";
import {OrderItem} from "../entity/order-item.entity";
import {NotFoundException} from "@nestjs/common";
import OrderRepository from "../../infrastructure/order.repository";

export default class DeliveryOrderService {

    constructor(private readonly orderRepository: OrderRepository) {
    }
    public deliveryOrder(orderId: string):Order{
        const orderDelivered: Order = this.orderRepository.getOrderById(orderId);
        orderDelivered.isDelivery(new Date());
        return orderDelivered;
    }

}