import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import OrderRepository from './infrastructure/order.repository';
import OrderController from './presentation/order.controller';
import { Order } from './domain/entity/order.entity';
import { OrderItem } from './domain/entity/order-item.entity';
import CreateOrderService from "./domain/use-case/order/create-order.service";
import PayOrderService from "./domain/use-case/order/pay-order.service";
import DeliveryOrderService from "./domain/use-case/order/delivery-order.service";
import BillingOrderService from "./domain/use-case/order/billing-order.service";
import CancelOrderService from "./domain/use-case/order/cancel-order.service";
import OrderRepositoryTypeOrm from "./infrastructure/order.repository";
import {OrderRepositoryInterface} from "./domain/port/order.repository.interface";
import PdfOrderRepositoryTypeOrm from "./infrastructure/pdf-order.repository";
import pdfOrderService from "./domain/use-case/order/pdf-order.service";
import {PdfOrderRepositoryInterface} from "./domain/port/pdf-order.repository.interface";
import {Product} from "./domain/entity/product.entity";
import ProductController from "./presentation/product.controller";
import ProductRepositoryTypeOrm from "./infrastructure/product.repository";
import CreateProductService from "./domain/use-case/product/create-product.service";
import {ProductRepositoryInterface} from "./domain/port/product.repository.interface";
import DeleteProductService from "./domain/use-case/product/delete-product.service";
import ListProductService from "./domain/use-case/product/list-product.service";
import ModifyProductService from "./domain/use-case/product/modify-product.service";
import AddItemOrderService from "./domain/use-case/order/add-item-order.service";
import {Promotion} from "./domain/entity/promotion.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem,Product, Promotion])],
  controllers: [OrderController, ProductController],
  providers: [
    {
      provide: 'OrderRepositoryInterface',
      useClass: OrderRepository,
    },
    OrderRepositoryTypeOrm,
    PdfOrderRepositoryTypeOrm,
    ProductRepositoryTypeOrm,
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
    },
    {
      provide :AddItemOrderService,
      useFactory: (orderRepository: OrderRepositoryInterface, productRepository: ProductRepositoryInterface) => {
        return new AddItemOrderService(orderRepository,productRepository);
      },
      inject: [OrderRepositoryTypeOrm,ProductRepositoryTypeOrm],
    },
    {
      provide :CreateProductService,
      useFactory: (productRepository: ProductRepositoryInterface) => {
        return new CreateProductService(productRepository);
      },
      inject: [ProductRepositoryTypeOrm],
    },
    {
      provide :DeleteProductService,
      useFactory: (productRepository: ProductRepositoryInterface, orderRepository: OrderRepositoryInterface) => {
        return new DeleteProductService(productRepository,orderRepository);
      },
      inject: [ProductRepositoryTypeOrm],
    },
    {
      provide :ListProductService,
      useFactory: (productRepository: ProductRepositoryInterface) => {
        return new ListProductService(productRepository);
      },
      inject: [ProductRepositoryTypeOrm],
    },
    {
      provide :ModifyProductService,
      useFactory: (productRepository: ProductRepositoryInterface) => {
        return new ModifyProductService(productRepository);
      },
      inject: [ProductRepositoryTypeOrm],
    }
  ],
})
export class OrderModule {}
