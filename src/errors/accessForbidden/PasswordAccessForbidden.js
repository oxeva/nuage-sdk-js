import NuageError from '../NuageError';

export default class PasswordAccessForbidden extends NuageError {
    constructor(args) {
        super(args, '');

        this.name = 'PasswordAccessForbidden';
    }
}
