import NuageError from '../NuageError';

export default class ProjectUsageAccessForbidden extends NuageError {
    constructor(args) {
        super(
            args,
            'You are not allowed to manipulate usages of the projects.',
        );

        this.name = 'ProjectUsageAccessForbidden';
    }
}
