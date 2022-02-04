import NuageError from '../NuageError';

export default class OrganizationLimitAccessForbidden extends NuageError {
    constructor(args) {
        super(
            args,
            'You are not allowed to manipulate quotas of the organizations.',
        );

        this.name = 'OrganizationLimitAccessForbidden';
    }
}
