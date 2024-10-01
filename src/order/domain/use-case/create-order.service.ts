import {Order} from "../entity/order.entity";
import {CreateOrderDto} from "../../presentation/order.controller";

export default class CreateOrderService{

    public createOrder(createOrderDto: CreateOrderDto){
        return new Order(createOrderDto.customerName,createOrderDto.shippingAddress,createOrderDto.invoiceAddress,createOrderDto.items);
    }
}