import NuageError from '../NuageError';

export default class InvoiceUncollectible extends NuageError {
    constructor(args) {
        super(args, 'Invoice is a draft or uncollectible.');

        this.name = 'InvoiceUncollectible';
    }
}
