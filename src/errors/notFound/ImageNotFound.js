import NuageError from '../NuageError';

export default class ImageNotFound extends NuageError {
    constructor(args) {
        super(args, 'Your image does not exists.');

        this.name = 'ImageNotFound';
    }
}
