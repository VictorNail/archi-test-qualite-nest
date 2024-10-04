import {CreateProduct, Product} from "../../entity/product.entity";
import {ProductRepositoryInterface} from "../../port/product.repository.interface";
import {BadRequestException} from "@nestjs/common";
import {OrderRepositoryInterface} from "../../port/order.repository.interface";

export default class DeleteProductService{
    constructor(private readonly productRepository: ProductRepositoryInterface,
                private readonly orderItemRepository: OrderRepositoryInterface) {}

    async execute(productId: string){
        const productToDelete = await this.productRepository.findById(productId);
        if (productToDelete) {
            throw new BadRequestException(Product.MESSAGE_NOT_FOUND_PRODUCT);
        }
        const orderItem = await this.orderItemRepository.findByProductInOrder(productToDelete.id);

        if (orderItem) {
            throw new BadRequestException('This product cannot be deleted, it is in an order');
        }

        await this.productRepository.deleteProduct(productToDelete.id);

    }
}