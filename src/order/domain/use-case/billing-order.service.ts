import {Order, } from "../entity/order.entity";
import OrderRepository from "../../infrastructure/order.repository";
import {OrderRepositoryInterface} from "../port/order.repository.interface";
export default class BillingOrderService {

    constructor(
        private readonly orderRepository: OrderRepositoryInterface
    ) {}

    public async billingOrder(orderId: string, newBillingAddress: string): Promise<Order> {
        const orderBilled: Order = await this.orderRepository.getOrderById(orderId);
        orderBilled.isBilled(newBillingAddress);
        return orderBilled;
    }

}