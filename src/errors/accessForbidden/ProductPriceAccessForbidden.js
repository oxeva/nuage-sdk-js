import NuageError from '../NuageError';

export default class ProductPriceAccessForbidden extends NuageError {
    constructor(args) {
        super(
            args,
            'You are not allowed to manipulate prices of the products.',
        );

        this.name = 'ProductPriceAccessForbidden';
    }
}
