import NuageError from '../NuageError';

export default class ImageAccessForbidden extends NuageError {
    constructor(args) {
        super(args, 'You are not allowed to manipulate images.');

        this.name = 'ImageAccessForbidden';
    }
}
