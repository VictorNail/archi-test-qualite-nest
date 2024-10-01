import {Order, } from "../entity/order.entity";
import OrderRepository from "../../infrastructure/order.repository";
export default class BillingOrderService {

    constructor(
        private readonly orderRepository: OrderRepository
    ) {}

    public billingOrder(orderId: string, newBillingAddress: string):Order{
        const orderBilled: Order = this.orderRepository.getOrderById(orderId);
        orderBilled.isBilled(newBillingAddress);
        return orderBilled;
    }

}