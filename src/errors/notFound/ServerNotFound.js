import NuageError from '../NuageError';

export default class ServerNotFound extends NuageError {
    constructor(args) {
        super(args, 'Your server does not exists.');

        this.name = 'ServerNotFound';
    }
}
