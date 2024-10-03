import {Order} from "../entity/order.entity";
import {OrderRepositoryInterface} from "../port/order.repository.interface";
import {NotFoundException} from "@nestjs/common";
import {PdfOrderRepositoryInterface} from "../port/pdf-order.repository.interface";

export default class pdfOrderService {

    constructor(
        private readonly pdfOrderRepository: PdfOrderRepositoryInterface,
        private readonly orderRepository: OrderRepositoryInterface
    ) {}

    public async generatePdf(orderId: string): Promise<string> {
        const order: Order = await this.orderRepository.findById(orderId);
        if (!order) {
            throw new NotFoundException(Order.MESSAGE_NOT_FOUND_ORDER);
        }
        order.generatePdf(this.pdfOrderRepository);
        return "order Cancel";
    }
}