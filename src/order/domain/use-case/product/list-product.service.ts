import {CreateProduct, Product} from "../../entity/product.entity";
import {ProductRepositoryInterface} from "../../port/product.repository.interface";
import {BadRequestException} from "@nestjs/common";
import {OrderRepositoryInterface} from "../../port/order.repository.interface";

export default class ListProductService{
    constructor(private readonly productRepository: ProductRepositoryInterface,
    ) {}

    async execute(isActive?: boolean){
        await this.productRepository.getProducts(isActive ?? false);

    }
}

