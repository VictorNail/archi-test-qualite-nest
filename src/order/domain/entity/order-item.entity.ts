import { Order } from '../entity/order.entity';
import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Product} from "./product.entity";


export interface ItemDetailCommand {
  product: Product;
  quantity: number;
}
@Entity('order-item')
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Order, (order) => order.orderItems)
  product: Product;

  @Column({
    type: 'int',
  })
  quantity: number;

  @Column({
    type: 'int',
  })
  price: number;

  @ManyToOne(() => Order, (order) => order.orderItems)
  order: Order;

  constructor(itemCommand: ItemDetailCommand) {
    if (!itemCommand) {
      return;
    }
    this.product = itemCommand.product;
    this.quantity = itemCommand.quantity;
    itemCommand.product.removeStock(itemCommand.quantity);

    this.price = itemCommand.product.price * itemCommand.quantity;
  }
}
