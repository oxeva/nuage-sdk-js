import NuageError from '../NuageError';

export default class OrganizationAccessForbidden extends NuageError {
    constructor(args) {
        super(args, 'You are not allowed to manipulate organizations.');

        this.name = 'OrganizationAccessForbidden';
    }
}
