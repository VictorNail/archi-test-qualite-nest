import {ItemDetailCommand, OrderItem} from '../entity/order-item.entity';
import {
  Column,
  CreateDateColumn,
  Entity, ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';
import {BadRequestException, NotFoundException} from "@nestjs/common";
import {IsNotEmpty} from "class-validator";
import {PdfOrderRepositoryInterface} from "../port/pdf-order.repository.interface";
import {Product} from "./product.entity";
import {CreatePromotion, Promotion} from "./promotion.entity";


export interface CreateOrderCommand {
  items: ItemDetailCommand[];
  customerName: string;
  shippingAddress: string;
  invoiceAddress: string;
  promotion?: CreatePromotion;
}

export enum Status{
  "PAID",
  "PENDING",
  "DELIVERY",
  "SHIPPED",
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
  static MESSAGE_SHIPPING_ADDRESS_NULL: string = "The shipping address is not listed";
  static MESSAGE_DELETE_IMPOSSIBLE: string = "Unable to delete order";
  static MESSAGE_NOT_POSSIBLE_ADD_ITEM: string = "It is not possible to add item for this order";




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

  @Column({ nullable: true })
  @Expose({ groups: ['group_orders'] })
  customerPhoneNumber: number;

  @Column({ nullable: true })
  @Expose({ groups: ['group_orders'] })
  customerEmail: string;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
    nullable: true,
  })
  @Expose({ groups: ['group_orders'] })
  orderItems: OrderItem[] ;

  @ManyToOne(() => Promotion, (promotion) => promotion.orders, {
    nullable: true,
  })
  promotion: Promotion;

  @Column({ nullable: true })
  @Expose({ groups: ['group_orders'] })
  shippingAddress: string | null;

  @Column({ nullable: true })
  @Expose({ groups: ['group_orders'] })
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

  @CreateDateColumn({ nullable: true })
  @Expose({ groups: ['group_orders'] })
  private cancelAt: Date | null;

  @Column({ nullable: true })
  @Expose({ groups: ['group_orders'] })
  private cancelReason: string | null;

  constructor(createOrderCommand?: CreateOrderCommand) {
    if(!createOrderCommand){
      return;
    }
    this.customerName = createOrderCommand.customerName ?? null;
    this.shippingAddress = createOrderCommand.shippingAddress ?? null;
    this.invoiceAddress = createOrderCommand.invoiceAddress ?? null;
    if(createOrderCommand.promotion != undefined) this.promotion = new Promotion(createOrderCommand.promotion);
    this.orderItems = [];

    createOrderCommand.items.forEach((newItem)=>{
      this.orderItems.push(new OrderItem(newItem));
    });
    if( this.orderItems.length > Order.maxItem){
      throw new BadRequestException(Order.MESSAGE_MAX_ITEM_FOR_ORDER);
    }
    this.calculatePrice();
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

  public isBilled(newBillingAddress: string){
    if(!this.shippingAddress ||this.shippingAddress == ""){
      throw new BadRequestException(Order.MESSAGE_SHIPPING_ADDRESS_NULL);
    }
    this.invoiceAddress = newBillingAddress ?? this.shippingAddress;
    this.status=Status.SHIPPED;
  }

  public cancel(cancelReason: string){
    if(this.status == Status.SHIPPED){
      throw new BadRequestException(Order.MESSAGE_DELETE_IMPOSSIBLE);
    }
    this.cancelAt = new Date();
    this.cancelReason = cancelReason;
    this.orderItems.forEach((item)=>{
      item.product.addStock(item.quantity);
    });
  }

  public isValid():boolean {
    return true;
  }

  public generatePdf(pdfOrderRepository: PdfOrderRepositoryInterface){
      if(this.status != Status.PENDING){
          pdfOrderRepository.generateOrder(this.customerName,this.orderItems);
      }
  }

  public addItem(newItem: ItemDetailCommand){
    if(this.status != Status.PENDING){
      throw  new BadRequestException(Order.MESSAGE_NOT_POSSIBLE_ADD_ITEM);
    }
    this.orderItems.push(new OrderItem(newItem));
    this.calculatePrice();
  }

  private calculatePrice(){
    this.price = this.orderItems.reduce((sum,item) => sum + item.price,0);
    if(this.promotion != null){
      this.price = this.price - this.promotion.amount;
    }

    if( this.price < Order.maxPriceForOrder){
      throw new BadRequestException(Order.MESSAGE_MAX_PRICE_FOR_ORDER);
    }
  }
}
