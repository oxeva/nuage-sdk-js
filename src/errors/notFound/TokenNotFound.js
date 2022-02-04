import NuageError from '../NuageError';

export default class TokenNotFound extends NuageError {
    constructor(args) {
        super(args, 'Cannot find a user with your email/password.');

        this.name = 'TokenNotFound';
    }
}
