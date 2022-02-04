import NuageError from '../NuageError';

export default class PaymentMethodNotFound extends NuageError {
    constructor(args) {
        super(args, 'Your payment method does not exists.');

        this.name = 'PaymentMethodNotFound';
    }
}
