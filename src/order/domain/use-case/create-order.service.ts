import {Order} from "../entity/order.entity";
import {CreateOrderDto} from "../../presentation/order.controller";
import {OrderItem} from "../entity/order-item.entity";
import {BadRequestException} from "@nestjs/common";

export default class CreateOrderService{

    public createOrder(createOrderDto: CreateOrderDto):string{
        const newOrder: Order = new Order(createOrderDto.customerName,createOrderDto.shippingAddress,createOrderDto.invoiceAddress,createOrderDto.items);
        return "Order Create";
    }
}