import {Order} from "../../entity/order.entity";
import {OrderRepositoryInterface} from "../../port/order.repository.interface";
import {ProductRepositoryInterface} from "../../port/product.repository.interface";
import {BadRequestException, NotFoundException} from "@nestjs/common";
import {Product} from "../../entity/product.entity";
import {AddItemDto} from "../../../presentation/order.controller";

export default class AddItemOrderService{
    constructor(private readonly orderRepository: OrderRepositoryInterface,
                private readonly productRepository: ProductRepositoryInterface
    ) {}

    async execute(orderId: string, newItem: AddItemDto){
        const orderSelected: Order = await this.orderRepository.findById(orderId);
        if (!orderSelected) {
            throw new NotFoundException(Order.MESSAGE_NOT_FOUND_ORDER);
        }
        const productSelected = await this.productRepository.findById(newItem.productId);
        if (productSelected) {
            throw new BadRequestException(Product.MESSAGE_NOT_FOUND_PRODUCT);
        }
        orderSelected.addItem({product: productSelected,quantity: newItem.quantity});

        return await this.orderRepository.save(orderSelected);
    }
}