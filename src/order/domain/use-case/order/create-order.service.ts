import {CreateOrderCommand, Order} from "../../entity/order.entity";
import {OrderRepositoryInterface} from "../../port/order.repository.interface";

export default class CreateOrderService{
    constructor(private readonly orderRepository: OrderRepositoryInterface) {}

    async createOrder(createOrderDto: CreateOrderCommand){
        const order =  new Order(createOrderDto);
        return await this.orderRepository.save(order);
    }
}