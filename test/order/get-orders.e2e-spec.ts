import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../../src/order/domain/entity/order.entity';
import {OrderItem} from "../../src/order/domain/entity/order-item.entity";

describe('Get Orders (e2e)', () => {
  let app: INestApplication;
  let order1: Order;
  let orderRepository: Repository<Order>;
  let item = new OrderItem();

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TypeOrmModule.forFeature([Order])],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Création d'une commande en BDD de test
    orderRepository = moduleFixture.get('OrderRepository');
    item.productName = "item1";
    item.price = 45;
    order1 = new Order("Name","22 rue des rues","22 rue des rues",[item,item]);
    await orderRepository.save(order1);
  });
  it('should return all', async () => {
    const responseGetOrders = await request(app.getHttpServer()).get('/orders');

    expect(responseGetOrders.status).toBe(200);

    const order = responseGetOrders.body.find((orderInResponse) => {
      return orderInResponse.id === order1.id;
    });

    expect(order).toBeDefined();

    expect(order.customerName).toBe('John Doe');
  });
});
