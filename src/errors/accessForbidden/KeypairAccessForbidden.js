import NuageError from '../NuageError';

export default class KeypairAccessForbidden extends NuageError {
    constructor(args) {
        super(args, 'You are not allowed to manipulate keypairs.');

        this.name = 'KeypairAccessForbidden';
    }
}
