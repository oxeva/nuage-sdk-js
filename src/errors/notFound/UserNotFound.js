import NuageError from '../NuageError';

export default class UserNotFound extends NuageError {
    constructor(args) {
        super(args, 'Your user does not exists.');

        this.name = 'UserNotFound';
    }
}
