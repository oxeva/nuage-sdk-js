import NuageError from '../NuageError';

export default class PasswordNotFound extends NuageError {
    constructor(args) {
        super(args, 'This password change token is expired or does not exist.');

        this.name = 'PasswordNotFound';
    }
}
