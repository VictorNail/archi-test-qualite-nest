import { Order } from '../../entity/order.entity';
import {OrderRepositoryInterface} from "../../port/order.repository.interface";
import {PdfOrderRepositoryInterface} from "../../port/pdf-order.repository.interface";
import pdfOrderService from "../../use-case/order/pdf-order.service";
import {OrderItem} from "../../entity/order-item.entity";

class OrderRepositoryFake {
    async save(order: Order): Promise<Order> {
        return order;
    }
}

class PdfOrderRepositoryFake {
    async   generateOrder(orderId: string, items: OrderItem[]): Promise<String>{
        return orderId;
    }

}

const orderRepositoryFake = new OrderRepositoryFake() as OrderRepositoryInterface;
const pdfOrderRepositoryFake = new PdfOrderRepositoryFake() as PdfOrderRepositoryInterface;

describe("an order can't be created if the order have more than 5 item", () => {
    it('should return an error', async () => {
        const PdfOrderService = new pdfOrderService(pdfOrderRepositoryFake,orderRepositoryFake);

        await expect(
            PdfOrderService.generatePdf(""),
        ).rejects.toThrow();
    });
});