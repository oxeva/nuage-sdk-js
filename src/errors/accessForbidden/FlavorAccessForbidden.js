import NuageError from '../NuageError';

export default class FlavorAccessForbidden extends NuageError {
    constructor(args) {
        super(args, 'You are not allowed to manipulate flavors.');

        this.name = 'FlavorAccessForbidden';
    }
}
