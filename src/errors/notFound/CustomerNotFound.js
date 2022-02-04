import NuageError from '../NuageError';

export default class CustomerNotFound extends NuageError {
    constructor(args) {
        super(args, 'Your customer does not exists.');

        this.name = 'CustomerNotFound';
    }
}
