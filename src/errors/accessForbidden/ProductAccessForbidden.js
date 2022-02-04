import NuageError from '../NuageError';

export default class ProductAccessForbidden extends NuageError {
    constructor(args) {
        super(args, 'You are not allowed to manipulate products.');

        this.name = 'ProductAccessForbidden';
    }
}
