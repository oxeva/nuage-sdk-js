import NuageError from '../NuageError';

export default class ProductPriceNotFound extends NuageError {
    constructor(args) {
        super(args, "Your product's price does not exists.");

        this.name = 'ProductPriceNotFound';
    }
}
