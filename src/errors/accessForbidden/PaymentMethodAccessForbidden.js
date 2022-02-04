import NuageError from '../NuageError';

export default class PaymentMethodAccessForbidden extends NuageError {
    constructor(args) {
        super(args, 'You are not allowed to manipulate payment methods.');

        this.name = 'PaymentMethodAccessForbidden';
    }
}
