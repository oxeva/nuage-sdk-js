import NuageError from '../NuageError';

export default class ItemAccessForbidden extends NuageError {
    constructor(args) {
        super(args, 'You are not allowed to manipulate items.');

        this.name = 'ItemAccessForbidden';
    }
}
