import { Body, Controller, Get, Post} from '@nestjs/common';
import {ArrayMaxSize, ArrayMinSize, IsNotEmpty} from "class-validator";
import {OrderItem} from "../domain/entity/order-item.entity";
import CreateOrderService from "../domain/use-case/create-order.service";



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
    constructor(private createOrderService: CreateOrderService) {
    }
    @Get()
    async getOrders() {
     return 'All orders';
    }

    @Post()
    async createOrders(@Body() body : CreateOrderDto) {
      return this.createOrderService.createOrder(body);
    }

}
