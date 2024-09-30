import {BadRequestException, Body, Controller, Get, Post, Req} from '@nestjs/common';
import {ArrayMinSize, IsNotEmpty} from "class-validator";

class OrderDto {

  @IsNotEmpty()
  @ArrayMinSize(0)
  items: Array<Item>;

  @IsNotEmpty()
  clientName: string;

  @IsNotEmpty()
  deliveryAddress: string;

  @IsNotEmpty()
  billingAddress: string;
}

class Item {
  public name : string;
  public price: number;
}

@Controller('/orders')
export default class OrderController {
  @Get()
  async getOrders() {
    return 'All orders';
  }

  @Post()
  async createOrders(@Body() body : OrderDto) {
    itemVerification(body.items);
    return 'Order Create';
  }
}


function itemVerification( items: Array<Item>){
    if(items.length > 5 ) {
      throw new BadRequestException('The order cannot contain more than 5 items.');
    }
    let totalItemPrice =0;
    items.forEach((item)=>{
      totalItemPrice += item.price;
    });
    if(totalItemPrice < 10){
      throw new BadRequestException('The total order amount must be at least 10€.');
    }
}
