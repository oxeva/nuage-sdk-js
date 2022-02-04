import NuageError from '../NuageError';

export default class IpNotFound extends NuageError {
    constructor(args) {
        super(args, 'Your IP does not exists.');

        this.name = 'IpNotFound';
    }
}
