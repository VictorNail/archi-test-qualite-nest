import {
    Column,
    Entity, OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';
import {OrderItem} from "./order-item.entity";


export interface CreateProduct {
    nameProduct: string;
    priceProduct: number;
    descriptionProduct: string
    stockProduct?: number;
    isActive?: boolean;
}

@Entity('product')
export class Product {
    static minStock: number = 0;
    static MESSAGE_NOT_FOUND_PRODUCT: string = "The product Id is not assigned";
    static MESSAGE_MODIFY_REQUIRED: string = "Name, price and description are required to edit the product.";

    @PrimaryGeneratedColumn()
    @Expose({ groups: ['group_orders'] })
    id: string;

    @Column()
    @Expose({ groups: ['group_orders'] })
    name: string;

    @Column({type:'int'})
    @Expose({ groups: ['group_orders'] })
    price: number;

    @Column()
    @Expose({ groups: ['group_orders'] })
    description: string;

    @Column({
        nullable: true,
        type:'int'
    })
    @Expose({ groups: ['group_orders'] })
    stock: number = 0;

    @Column({ nullable: true })
    @Expose({ groups: ['group_orders'] })
    isActive: boolean= true;

    @OneToMany(() => OrderItem, orderItem => orderItem.product,{
        nullable: true
    })
    orderItems: OrderItem[];

    constructor(createProduct?: CreateProduct) {
        if(!createProduct){
            return;
        }
        this.name = createProduct.nameProduct;
        this.price= createProduct.priceProduct;
        this.description = createProduct.descriptionProduct;
        if(createProduct.isActive != undefined) this.isActive = createProduct.isActive;
        if(createProduct.stockProduct != undefined) this.stock = createProduct.stockProduct;
    }
    public updateProduct(newProduct: Partial<CreateProduct>){
        if(newProduct.nameProduct != undefined)this.name = newProduct.nameProduct;
        if(newProduct.priceProduct != undefined)this.price= newProduct.priceProduct;
        if(newProduct.descriptionProduct != undefined)this.description = newProduct.descriptionProduct;
        if(newProduct.isActive != undefined) this.isActive = newProduct.isActive;
        if(newProduct.stockProduct != undefined) this.stock = newProduct.stockProduct;
    }
    public addStock(newStock: number){
        this.stock = this.stock + newStock;
    }

    public removeStock(newStock: number){
        this.stock = this.stock - newStock;
        if(this.stock <= Product.minStock)console.log("email to admin@test.fr");
    }
}
