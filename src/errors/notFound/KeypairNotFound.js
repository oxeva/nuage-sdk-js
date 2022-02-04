import NuageError from '../NuageError';

export default class KeypairNotFound extends NuageError {
    constructor(args) {
        super(args, 'Your keypair does not exists.');

        this.name = 'KeypairNotFound';
    }
}
