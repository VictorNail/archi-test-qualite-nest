import {Order, Status} from "../entity/order.entity";
import {OrderItem} from "../entity/order-item.entity";
import {NotFoundException} from "@nestjs/common";

export default class DeliveryOrderService {

    public deliveryOrder(orderId: string):Order{
        const orderDelivered: Order = this.getOrderById(orderId);
        orderDelivered.isDelivery(new Date());
        return orderDelivered;
    }

    private getOrderById(orderId: string):Order{
        const item = new OrderItem();
        item.productName = "item1";
        item.price = 45;
        const order: Order = new Order("Name","22 rue des rues","22 rue des rues",[item,item]);
        if(!order){
            throw new NotFoundException(Order.MESSAGE_NOT_FOUND_ORDER);
        }
        return order;
    }
}