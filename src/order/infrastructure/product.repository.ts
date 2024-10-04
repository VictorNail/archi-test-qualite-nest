import {DataSource, Repository} from 'typeorm';
import {InjectDataSource} from "@nestjs/typeorm";
import {Product} from "../domain/entity/product.entity";
import {ProductRepositoryInterface} from "../domain/port/product.repository.interface";


export default class ProductRepositoryTypeOrm
    extends Repository<Product>
    implements ProductRepositoryInterface
{
    constructor(@InjectDataSource() private readonly datasource: DataSource) {
        super(Product, datasource.createEntityManager());
    }

    async findById(id: string): Promise<Product | null> {
        const queryBuilder = this.createQueryBuilder('product');

        queryBuilder.where('product.id = :id', { id });

        return  queryBuilder.getOne();
    }

    async findAll(): Promise<Product[]> {
        const queryBuilder = this.createQueryBuilder('product');

        return queryBuilder.getMany();
    }

    async deleteProduct(id: string): Promise<void> {
        const queryBuilder = this.createQueryBuilder('product');

        queryBuilder.where('product.id = :id', { id });

        await queryBuilder.delete().execute();
    }
    async getProducts(isActive: boolean): Promise<Product[]> {
        const queryBuilder = this.createQueryBuilder('product');

        if (isActive) {
            queryBuilder.where('product.isActive = true');
        }

        return await queryBuilder.getMany();
    }
}
