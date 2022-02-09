import NuageError from '../NuageError';

export default class InvoiceNotFullyPaid extends NuageError {
    constructor(args) {
        super(args, 'Invoice still not fully paid.');

        this.name = 'InvoiceNotFullyPaid';
    }
}
