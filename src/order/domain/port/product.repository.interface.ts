import { Product } from '../entity/product.entity';

export interface ProductRepositoryInterface {
    save(product: Product): Promise<Product>;
    findById(id: string): Promise<Product | null>;
    findAll(): Promise<Product[]>;
    deleteProduct(id: string): Promise<void>;
    getProducts(isActive: boolean): Promise<Product[]>;
}
