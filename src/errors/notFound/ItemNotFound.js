import NuageError from '../NuageError';

export default class ItemNotFound extends NuageError {
    constructor(args) {
        super(args, 'Your item does not exists.');

        this.name = 'ItemNotFound';
    }
}
