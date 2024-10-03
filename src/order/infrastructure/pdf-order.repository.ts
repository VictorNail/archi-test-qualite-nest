import {  Repository } from 'typeorm';
import {Order} from '../domain/entity/order.entity';
import {OrderItem} from "../domain/entity/order-item.entity";
import {PdfOrderRepositoryInterface} from "../domain/port/pdf-order.repository.interface";
import {PdfDocument} from "@ironsoftware/ironpdf";


export default class PdfOrderRepositoryTypeOrm
    extends Repository<Order>
    implements PdfOrderRepositoryInterface
{
    async generateOrder(orderId: string, items: OrderItem[]):Promise<string>{
        const itemsHtml = items.map(item => `
        <tr>
            <td>${item.productName}</td>
            <td>${item.quantity}</td>
            <td>${item.price} €</td>
        </tr>
        `).join('');

        const htmlContent = `
            <html lang="fr"> 
                <body>
                    <h1>Order ID: ${orderId}</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Item Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${itemsHtml}
                        </tbody>
                    </table>
                </body>
            </html>`;

        const pdf = await PdfDocument.fromHtml(htmlContent);
        const pdfPath = `order-${orderId}.pdf`;
        await pdf.saveAs(pdfPath);

        return pdfPath;
    }

}
