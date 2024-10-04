import {Order} from "../../entity/order.entity";
import {OrderRepositoryInterface} from "../../port/order.repository.interface";
import {NotFoundException} from "@nestjs/common";

export default class CancelOrderService {

    constructor( private readonly orderRepository: OrderRepositoryInterface)
    {}

    public async cancelOrder(orderId: string, cancelReason: string): Promise<string> {
        const orderCancel: Order = await this.orderRepository.findById(orderId);
        if (!orderCancel) {
            throw new NotFoundException(Order.MESSAGE_NOT_FOUND_ORDER);
        }
        orderCancel.cancel(cancelReason);
        return "order Cancel";
    }
}