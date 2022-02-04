import NuageError from '../NuageError';

export default class ProjectUsageNotFound extends NuageError {
    constructor(args) {
        super(args, "Your project's usage does not exists.");

        this.name = 'ProjectUsageNotFound';
    }
}
