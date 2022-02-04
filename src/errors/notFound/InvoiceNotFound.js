import NuageError from '../NuageError';

export default class InvoiceNotFound extends NuageError {
    constructor(args) {
        super(args, 'Your invoice does not exists.');

        this.name = 'InvoiceNotFound';
    }
}
