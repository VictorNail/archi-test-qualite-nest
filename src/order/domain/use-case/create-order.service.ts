import {Order} from "../entity/order.entity";
import {CreateOrderDto} from "../../presentation/order.controller";
import {OrderRepositoryInterface} from "../port/order.repository.interface";

export default class CreateOrderService{
    constructor(private readonly orderRepository: OrderRepositoryInterface) {}

    async createOrder(createOrderDto: CreateOrderDto){
        const order =  new Order(createOrderDto.customerName,createOrderDto.shippingAddress,createOrderDto.invoiceAddress,createOrderDto.items);
        return await this.orderRepository.save(order);

    }
}