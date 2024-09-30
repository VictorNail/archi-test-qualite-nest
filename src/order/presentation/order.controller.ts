import {Body, Controller, Get, Param, Post, Put} from '@nestjs/common';
import {ArrayMaxSize, ArrayMinSize, IsNotEmpty} from "class-validator";
import {OrderItem} from "../domain/entity/order-item.entity";
import CreateOrderService from "../domain/use-case/create-order.service";
import PayOrderService from "../domain/use-case/pay-order.service";



export class CreateOrderDto {

  @IsNotEmpty()
    @ArrayMinSize(1)
    @ArrayMaxSize(5)
    items: Array<OrderItem>;

    @IsNotEmpty()
    customerName: string;

  @IsNotEmpty()
  shippingAddress: string;

  @IsNotEmpty()
  invoiceAddress: string;
}

@Controller('/orders')
export default class OrderController {
    constructor(
        private readonly createOrderService: CreateOrderService,
        private readonly payOrderService: PayOrderService
    ) {}
    @Get()
    async getOrders() {
     return 'All orders';
    }

    @Put(':id/pay')
    async payOrder(@Param('id') orderId: string){
        return this.payOrderService.payOrder(orderId);
    }

    @Post()
    async createOrders(@Body() body : CreateOrderDto) {
      return this.createOrderService.createOrder(body);
    }

}
