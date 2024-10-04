import {CreateProduct, Product} from "../../entity/product.entity";
import {ProductRepositoryInterface} from "../../port/product.repository.interface";
import {BadRequestException, NotFoundException} from "@nestjs/common";
import {OrderRepositoryInterface} from "../../port/order.repository.interface";

export default class ModifyProductService{
    constructor(private readonly productRepository: ProductRepositoryInterface,
    ) {}

    async execute(productId: string,updateData: Partial<CreateProduct>){
        const product = await this.productRepository.findById(productId);
        if (!product) {
            throw new NotFoundException(Product.MESSAGE_NOT_FOUND_PRODUCT);
        }
        if (!updateData.nameProduct || !updateData.priceProduct || !updateData.descriptionProduct) {
            throw new BadRequestException(Product.MESSAGE_MODIFY_REQUIRED);
        }

        product.updateProduct(updateData);

        return await this.productRepository.save(product);
    }
}

