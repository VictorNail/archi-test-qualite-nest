import {Body, Controller, Delete, Get, Param, Patch, Post, Put, Query} from '@nestjs/common';

import CreateProductService from "../domain/use-case/product/create-product.service";
import {CreateProduct} from "../domain/entity/product.entity";
import DeleteProductService from "../domain/use-case/product/delete-product.service";
import ListProductService from "../domain/use-case/product/list-product.service";
import ModifyProductService from "../domain/use-case/product/modify-product.service";



@Controller('/products')
export default class ProductController {
    constructor(
        private readonly createProductService: CreateProductService,
        private readonly deleteProductService: DeleteProductService,
        private readonly listProductService: ListProductService,
        private readonly modifyProductService: ModifyProductService,

    ) {}

    @Get()
    async getAllProduct(@Query('isActive') isActive?: boolean){
        return this.listProductService.execute(isActive);
    }

    @Post()
    async createProduct(@Body() body : CreateProduct) {
        return this.createProductService.execute(body);
    }

    @Patch(':id')
    async modifyProduct(@Param('id') productId: string, @Body() updateData: Partial<CreateProduct>){
        return this.modifyProductService.execute(productId,updateData);
    }

    @Delete(':id')
    async deleteProduct(@Param('id') productId: string): Promise<void> {
        return this.deleteProductService.execute(productId);
    }

}
