import {Order} from "../entity/order.entity";
import {OrderRepositoryInterface} from "../port/order.repository.interface";

export default class CancelOrderService {

    constructor( private readonly orderRepository: OrderRepositoryInterface)
    {}

    public async cancelOrder(orderId: string, cancelReason: string): Promise<string> {
        const orderCancel: Order = await this.orderRepository.getOrderById(orderId);
        orderCancel.cancel(cancelReason);
        return "order Cancel";
    }
}