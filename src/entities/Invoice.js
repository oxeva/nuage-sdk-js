import { invoiceCustomErrors } from '../errors/entitiesError';
import Logger from '../utils/Logger';
import trimUrl from '../utils/trimUrl';
import { URL_INVOICES } from '../utils/urls';
import Entity from './Entity';
import PaymentMethod from './PaymentMethod';

export default class Invoice extends Entity {
    constructor(entity = {}) {
        super();

        Logger.debug('Invoice.constructor()', { entity });

        const {
            id,
            customer,
            paymentMethod,
            currency,
            status,
            total,
            amountRemaining,
            createdAt,
            paidAt,
            number,
            invoicePdf,
            billingPeriod,
        } = entity;

        this.id = trimUrl(id);
        this.customer = trimUrl(customer);
        this.paymentMethod = paymentMethod && new PaymentMethod(paymentMethod);
        this.currency = currency;
        this.status = status;
        this.total = total;
        this.amountRemaining = amountRemaining;
        this.createdAt = createdAt;
        this.paidAt = paidAt;
        this.number = number;
        this.invoicePdf = invoicePdf;
        this.billingPeriod = billingPeriod;

        this.className = 'Invoice';
        this.url = URL_INVOICES;
        this.customErrors = invoiceCustomErrors;
        this.original = { ...this };
    }
}
