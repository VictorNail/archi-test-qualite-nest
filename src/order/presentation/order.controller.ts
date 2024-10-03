import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {ArrayMaxSize, ArrayMinSize, IsNotEmpty, IsString} from "class-validator";
import {OrderItem} from "../domain/entity/order-item.entity";
import CreateOrderService from "../domain/use-case/create-order.service";
import PayOrderService from "../domain/use-case/pay-order.service";
import DeliveryOrderService from "../domain/use-case/delivery-order.service";
import BillingOrderService from "../domain/use-case/billing-order.service";
import CancelOrderService from "../domain/use-case/cancel-order.service";
import {CreateOrderCommand} from "../domain/entity/order.entity";

export class BillingOrderDto {
    @IsString()
    newBillingAddress: string;
}

export class CancelOrderDto {
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
        private readonly cancelOrderService: CancelOrderService,
    ) {}
    @Get()
    async getOrders() {
     return 'All orders';
    }

    @Post()
    async createOrders(@Body() body : CreateOrderCommand) {
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
    async cancelOrder(@Param('id') orderId: string, @Body() body : CancelOrderDto){
        return this.cancelOrderService.cancelOrder(orderId, body.reason);
    }
}
