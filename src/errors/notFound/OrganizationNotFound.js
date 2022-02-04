import NuageError from '../NuageError';

export default class OrganizationNotFound extends NuageError {
    constructor(args) {
        super(args, 'Your organization does not exists.');

        this.name = 'OrganizationNotFound';
    }
}
