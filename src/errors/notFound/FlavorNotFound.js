import NuageError from '../NuageError';

export default class FlavorNotFound extends NuageError {
    constructor(args) {
        super(args, 'Your flavor does not exists.');

        this.name = 'FlavorNotFound';
    }
}
