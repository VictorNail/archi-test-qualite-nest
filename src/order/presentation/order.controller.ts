import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {ArrayMaxSize, ArrayMinSize, IsNotEmpty, IsString} from "class-validator";
import {OrderItem} from "../domain/entity/order-item.entity";
import CreateOrderService from "../domain/use-case/create-order.service";
import PayOrderService from "../domain/use-case/pay-order.service";
import DeliveryOrderService from "../domain/use-case/delivery-order.service";
import BillingOrderService from "../domain/use-case/billing-order.service";
import DeleteOrderService from "../domain/use-case/Delete-order.service";



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

export class BillingOrderDto {
    @IsString()
    newBillingAddress: string;
}

export class DeleteOrderDto {
    @IsNotEmpty()
    reason: string;
}

@Controller('/orders')
export default class OrderController {
    constructor(
        private readonly createOrderService: CreateOrderService,
        private readonly payOrderService: PayOrderService,
        private readonly deliveryOrderService: DeliveryOrderService,
        private readonly billingOrderService: BillingOrderService,
        private readonly deleteOrderService: DeleteOrderService,
    ) {}
    @Get()
    async getOrders() {
     return 'All orders';
    }

    @Post()
    async createOrders(@Body() body : CreateOrderDto) {
        return this.createOrderService.createOrder(body);
    }

    @Put(':id/pay')
    async payOrder(@Param('id') orderId: string){
        return this.payOrderService.payOrder(orderId);
    }

    @Put(':id/delivery')
    async deliveryOrder(@Param('id') orderId: string){
        return this.deliveryOrderService.deliveryOrder(orderId);
    }

    @Put(':id/billing')
    async billingOrder(@Param('id') orderId: string, @Body() body : BillingOrderDto){
        return this.billingOrderService.billingOrder(orderId, body.newBillingAddress);
    }

    @Delete('id')
    async deleteOrder(@Param('id') orderId: string, @Body() body : DeleteOrderDto){
        return this.deleteOrderService.deleteOrder(orderId, body.reason);
    }
}
