import { invoiceCustomErrors } from '../errors/entitiesError';
import Controller from './Controller';
import { URL_INVOICES } from '../utils/urls';
import Logger from '../utils/Logger';

export default class InvoiceController extends Controller {
    constructor() {
        super();

        this.url = URL_INVOICES;
        this.customErrors = invoiceCustomErrors;
    }

    captureInvoice(filters) {
        Logger.debug('InvoiceController.captureInvoice()', { filters });

        const { id } = filters;

        const url = `${this.url}/${id}/capture`;

        this.promise = this.Request.post(url, '{}').then(({ response }) => {
            // Get custom error
            const error = this.getError(response);

            return { data: undefined, error };
        });

        return this;
    }
}
