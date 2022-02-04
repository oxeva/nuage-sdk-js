import NuageError from '../NuageError';

export default class InvoiceAccessForbidden extends NuageError {
    constructor(args) {
        super(args, 'You are not allowed to manipulate invoices.');

        this.name = 'InvoiceAccessForbidden';
    }
}
