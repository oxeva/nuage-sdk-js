import NuageError from '../NuageError';

export default class CustomerAccessForbidden extends NuageError {
    constructor(args) {
        super(args, 'You are not allowed to manipulate customers.');

        this.name = 'CustomerAccessForbidden';
    }
}
