import {OrderItem} from "../entity/order-item.entity";

export interface PdfOrderRepositoryInterface {
    generateOrder(orderId: string, items: OrderItem[]);
}
