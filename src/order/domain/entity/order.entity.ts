import { OrderItem } from '../entity/order-item.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';


export enum Status{
  "paid",
  "create"
}
@Entity()
export class Order {
  static maxPriceForOrder: number = 10;
  static MESSAGE_MAX_PRICE_FOR_ORDER: string = `The total order amount must be at least ${Order.maxPriceForOrder}€`;
  static MESSAGE_NOT_FOUND_ORDER: string = "The order Id is not assigned.";

  @CreateDateColumn()
  @Expose({ groups: ['group_orders'] })
  createdAt: Date;

  @PrimaryGeneratedColumn()
  @Expose({ groups: ['group_orders'] })
  id: string;

  @Column({ nullable: true })
  @Expose({ groups: ['group_orders'] })
  price: number;

  @Column()
  @Expose({ groups: ['group_orders'] })
  customerName: string;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
    nullable: true,
  })
  @Expose({ groups: ['group_orders'] })
  orderItems: OrderItem[];

  @Column({ nullable: true })
  @Expose({ groups: ['group_orders'] })
  shippingAddress: string | null;

  invoiceAddress: string | null;

  @Column({ nullable: true })
  @Expose({ groups: ['group_orders'] })
  shippingAddressSetAt: Date | null;

  @Column()
  @Expose({ groups: ['group_orders'] })
  status: Status = Status.create;

  @Column({ nullable: true })
  @Expose({ groups: ['group_orders'] })
  paidAt: Date | null;

  constructor(newCustomerName: string, newShippingAddress: string, newInvoiceAddress: string, newItems: Array<OrderItem>) {
    this.customerName = newCustomerName;
    this.shippingAddress = newShippingAddress;
    this.invoiceAddress = newInvoiceAddress;
    this.orderItems = newItems;
  }
}
