import {Order} from "../entity/order.entity";
import OrderRepository from "../../infrastructure/order.repository";

export default class DeleteOrderService {

    constructor( private readonly orderRepository: OrderRepository) {
    }

    public deleteOrder(orderId: string, deleteReason: string):string{
        const orderDelete: Order = this.orderRepository.getOrderById(orderId);
        orderDelete.delete(deleteReason);
        return "orderDelete";
    }
}