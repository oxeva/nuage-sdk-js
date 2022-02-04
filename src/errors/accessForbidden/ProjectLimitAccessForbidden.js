import NuageError from '../NuageError';

export default class ProjectLimitAccessForbidden extends NuageError {
    constructor(args) {
        super(
            args,
            'You are not allowed to manipulate quotas of the projects.',
        );

        this.name = 'ProjectLimitAccessForbidden';
    }
}
