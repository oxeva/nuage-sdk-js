import NuageError from '../NuageError';

export default class OrganizationLimitNotFound extends NuageError {
    constructor(args) {
        super(args, "Your organization's quota does not exists.");

        this.name = 'OrganizationLimitNotFound';
    }
}
