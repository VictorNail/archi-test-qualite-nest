import {CreateProduct, Product} from "../../entity/product.entity";
import {ProductRepositoryInterface} from "../../port/product.repository.interface";

export default class CreateProductService{
    constructor(private readonly productRepository: ProductRepositoryInterface) {}

    async execute(createProduct: CreateProduct){
        const product =  new Product(createProduct);
        return await this.productRepository.save(product);
    }
}