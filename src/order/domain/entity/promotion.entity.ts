import { Order } from '../entity/order.entity';
import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Product} from "./product.entity";
import {Expose} from "class-transformer";
import {OrderItem} from "./order-item.entity";


export interface CreatePromotion{
    namePromo: string;
    codePromo: string;
    amountPromo?: number;
}

@Entity('promotion')
export class Promotion {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @Expose({ groups: ['group_orders'] })
    name: string;

    @Column()
    @Expose({ groups: ['group_orders'] })
    code: string;


    @Column({
        type: 'int',
    })
    amount: number;

    @OneToMany(() => Order, (order) => order.promotion, {
        nullable: true,
    })
    orders: Order[];

    constructor(promo: CreatePromotion) {
        if (!promo) {
            return;
        }
        this.name = promo.namePromo;
        this.code = promo.codePromo;
        this.amount = promo.amountPromo ?? 1500;

    }
}
