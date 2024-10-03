import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import OrderRepository from './infrastructure/order.repository';
import OrderController from './presentation/order.controller';
import { Order } from './domain/entity/order.entity';
import { OrderItem } from './domain/entity/order-item.entity';
import CreateOrderService from "./domain/use-case/create-order.service";
import PayOrderService from "./domain/use-case/pay-order.service";
import DeliveryOrderService from "./domain/use-case/delivery-order.service";
import BillingOrderService from "./domain/use-case/billing-order.service";
import CancelOrderService from "./domain/use-case/cancel-order.service";
import OrderRepositoryTypeOrm from "./infrastructure/order.repository";
import {OrderRepositoryInterface} from "./domain/port/order.repository.interface";
import PdfOrderRepositoryTypeOrm from "./infrastructure/pdf-order.repository";
import pdfOrderService from "./domain/use-case/pdf-order.service";
import {PdfOrderRepositoryInterface} from "./domain/port/pdf-order.repository.interface";

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem])],
  controllers: [OrderController],
  providers: [
    {
      provide: 'OrderRepositoryInterface',
      useClass: OrderRepository,
    },
    OrderRepositoryTypeOrm,
    PdfOrderRepositoryTypeOrm,
    {
      provide :CreateOrderService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new CreateOrderService(orderRepository);
      },
      inject: [OrderRepositoryTypeOrm],
    },
    {
      provide :PayOrderService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new PayOrderService(orderRepository);
      },
      inject: [OrderRepositoryTypeOrm],
    },
    {
      provide :DeliveryOrderService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new DeliveryOrderService(orderRepository);
      },
      inject: [OrderRepositoryTypeOrm],
    },
    {
      provide :BillingOrderService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new BillingOrderService(orderRepository);
      },
      inject: [OrderRepositoryTypeOrm],
    },
    {
      provide :CancelOrderService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new CancelOrderService(orderRepository);
      },
      inject: [OrderRepositoryTypeOrm],
    },
    {
      provide :pdfOrderService,
      useFactory: (orderRepository: OrderRepositoryInterface, pdfOrderRepository: PdfOrderRepositoryInterface) => {
        return new pdfOrderService(pdfOrderRepository,orderRepository);
      },
      inject: [PdfOrderRepositoryTypeOrm,OrderRepositoryTypeOrm],
    }
  ],
})
export class OrderModule {}
