import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import OrderRepository from './infrastructure/order.repository';
import OrderController from './presentation/order.controller';
import { Order } from './domain/entity/order.entity';
import { OrderItem } from './domain/entity/order-item.entity';
import CreateOrderService from "./domain/use-case/create-order.service";
import PayOrderService from "./domain/use-case/pay-order.service";
import DeliveryOrderService from "./domain/use-case/delivery-order.service";

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem])],
  controllers: [OrderController],
  providers: [
    {
      provide: 'OrderRepositoryInterface',
      useClass: OrderRepository,
    },
    CreateOrderService,
    PayOrderService,
    DeliveryOrderService,
  ],
})
export class OrderModule {}
