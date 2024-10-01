import { OrderItem } from '../entity/order-item.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';
import {NotFoundException} from "@nestjs/common";


export enum Status{
  "PAID",
  "PENDING",
  "DELIVERY"
}
@Entity()
export class Order {
  static maxPriceForOrder:number = 10;
  static maxPriceForPay: number = 500;
  static minItemForDelivery: number = 3;
  static maxItem:number = 5;
  static MESSAGE_MAX_PRICE_FOR_ORDER: string = `The total order amount must be at least ${Order.maxPriceForOrder}€`;
  static MESSAGE_NOT_FOUND_ORDER: string = "The order Id is not assigned";
  static MESSAGE_MAX_ITEM_FOR_ORDER: string =`The order amount must be at least ${Order.maxItem} items`;
  static MESSAGE_NOT_POSSIBLE_PAY: string = "It is not possible to pay for this order";
  static MESSAGE_NOT_POSSIBLE_DELIVERY: string = "It is not possible to delivery for this order";




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
  private status: Status = Status.PENDING;

  @Column({ nullable: true })
  @Expose({ groups: ['group_orders'] })
  private paidAt: Date | null;

  constructor(newCustomerName: string, newShippingAddress: string, newInvoiceAddress: string, newItems: Array<OrderItem>) {
    this.customerName = newCustomerName;
    this.shippingAddress = newShippingAddress;
    this.invoiceAddress = newInvoiceAddress;
    this.orderItems = newItems;
    this.price = this.orderItems.reduce((sum,item) => sum + item.price,0);
  }

  public isPaid(){
    if(this.status != Status.PENDING || this.price > Order.maxPriceForPay){
      throw new NotFoundException(Order.MESSAGE_NOT_POSSIBLE_PAY);
    }
    this.status = Status.PAID;
    this.paidAt = new Date();
  }

  public isDelivery(shippingAddressSet: Date){
    if(this.status != Status.PAID || this.orderItems.length < Order.minItemForDelivery){
      throw new NotFoundException(Order.MESSAGE_NOT_POSSIBLE_DELIVERY);
    }
    this.status = Status.DELIVERY;
    this.price += 5;
    this.shippingAddressSetAt = shippingAddressSet;
  }
}
