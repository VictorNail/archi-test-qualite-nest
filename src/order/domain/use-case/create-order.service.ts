import {Order} from "../entity/order.entity";
import {CreateOrderDto} from "../../presentation/order.controller";
import {OrderItem} from "../entity/order-item.entity";
import {BadRequestException} from "@nestjs/common";

export default class CreateOrderService{

    public createOrder(createOrderDto: CreateOrderDto):string{
        const newOrder: Order = new Order(createOrderDto.customerName,createOrderDto.shippingAddress,createOrderDto.invoiceAddress,createOrderDto.items);
        this.itemsVerification(newOrder);
        return "Order Create";
    }

    private itemsVerification( order: Order){
        if(order.orderItems.length > Order.maxItem){
            throw new BadRequestException(Order.MESSAGE_MAX_ITEM_FOR_ORDER);
        }
        if(order.price < Order.maxPriceForOrder){
            throw new BadRequestException(Order.MESSAGE_MAX_PRICE_FOR_ORDER);
        }
    }
}