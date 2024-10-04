import {Body, Controller, Delete, Get, Param, Patch, Post, Put} from '@nestjs/common';
import {ArrayMaxSize, ArrayMinSize, IsDate, IsNotEmpty, IsString} from "class-validator";
import {OrderItem} from "../domain/entity/order-item.entity";
import CreateOrderService from "../domain/use-case/order/create-order.service";
import PayOrderService from "../domain/use-case/order/pay-order.service";
import DeliveryOrderService from "../domain/use-case/order/delivery-order.service";
import BillingOrderService from "../domain/use-case/order/billing-order.service";
import CancelOrderService from "../domain/use-case/order/cancel-order.service";
import {CreateOrderCommand} from "../domain/entity/order.entity";
import {CreateProduct} from "../domain/entity/product.entity";
import AddItemOrderService from "../domain/use-case/order/add-item-order.service";

export class NewAddressOrderDto {
    @IsString()
    newAddress: string;
}

export class NewDateOrderDto{
    @IsDate()
    newDate: Date;
}

export class CancelOrderDto {
    @IsNotEmpty()
    reason: string;
}

export class AddItemDto {
    @IsNotEmpty()
    productId: string;
    @IsNotEmpty()
    quantity: number;
}

@Controller('/orders')
export default class OrderController {
    constructor(
        private readonly createOrderService: CreateOrderService,
        private readonly payOrderService: PayOrderService,
        private readonly deliveryOrderService: DeliveryOrderService,
        private readonly billingOrderService: BillingOrderService,
        private readonly cancelOrderService: CancelOrderService,
        private readonly addItemOrderService: AddItemOrderService
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
    async deliveryOrder(@Param('id') orderId: string, @Body() body: NewDateOrderDto){
        return this.deliveryOrderService.deliveryOrder(orderId, body.newDate);
    }

    @Put(':id/billing')
    async billingOrder(@Param('id') orderId: string, @Body() body : NewAddressOrderDto){
        return this.billingOrderService.billingOrder(orderId, body.newAddress);
    }

    @Put(':id')
    async addItem(@Param('id') productId: string, @Body() body: AddItemDto ){
        return this.addItemOrderService.execute(productId,body);
    }

    @Delete('id')
    async cancelOrder(@Param('id') orderId: string, @Body() body : CancelOrderDto){
        return this.cancelOrderService.cancelOrder(orderId, body.reason);
    }
}
