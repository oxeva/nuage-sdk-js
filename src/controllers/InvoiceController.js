import { invoiceCustomErrors } from '../errors/entitiesError';
import Controller from './Controller';
import { URL_INVOICES } from '../utils/urls';

export default class InvoiceController extends Controller {
    constructor() {
        super();

        this.url = URL_INVOICES;
        this.customErrors = invoiceCustomErrors;
    }
}
