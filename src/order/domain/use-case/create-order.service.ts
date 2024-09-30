import {Order} from "../entity/order.entity";
import {CreateOrderDto} from "../../presentation/order.controller";
import {OrderItem} from "../entity/order-item.entity";
import {BadRequestException} from "@nestjs/common";

export default class CreateOrderService{

    public createOrder(createOrderDto: CreateOrderDto):string{
        const newOrder: Order = new Order(createOrderDto.customerName,createOrderDto.shippingAddress,createOrderDto.invoiceAddress,createOrderDto.items);
        this.itemTotalPriceVerification(newOrder.orderItems);
        return "Order Create";
    }

    private itemTotalPriceVerification( items: Array<OrderItem>){
        const total: number = items.reduce((sum,item) => sum + item.price,0);
        if(total < Order.maxPriceForOrder){
            throw new BadRequestException(Order.MESSAGE_MAX_PRICE_FOR_ORDER);
        }
    }
}