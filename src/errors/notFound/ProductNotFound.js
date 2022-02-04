import NuageError from '../NuageError';

export default class ProductNotFound extends NuageError {
    constructor(args) {
        super(args, 'Your project does not exists.');

        this.name = 'ProductNotFound';
    }
}
