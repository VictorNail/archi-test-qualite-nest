import {Order} from "../entity/order.entity";
import OrderRepository from "../../infrastructure/order.repository";

export default class CancelOrderService {

    constructor( private readonly orderRepository: OrderRepository)
    {}

    public cancelOrder(orderId: string, cancelReason: string):string{
        const orderCancel: Order = this.orderRepository.getOrderById(orderId);
        orderCancel.cancel(cancelReason);
        return "order Cancel";
    }
}