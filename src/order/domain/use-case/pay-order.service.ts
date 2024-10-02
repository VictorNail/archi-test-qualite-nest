import {Order} from "../entity/order.entity";
import {OrderItem} from "../entity/order-item.entity";
import {NotFoundException} from "@nestjs/common";
import {OrderRepositoryInterface} from "../port/order.repository.interface";

export default class PayOrderService{

    constructor(private readonly orderRepository: OrderRepositoryInterface) {}

    public payOrder(orderId: string):Order{
        const orderPayed: Order = this.getOrderById(orderId);
        orderPayed.isPaid();
        return orderPayed;
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