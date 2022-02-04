import NuageError from '../NuageError';

export default class ProjectLimitNotFound extends NuageError {
    constructor(args) {
        super(args, "Your project's quota does not exists.");

        this.name = 'ProjectLimitNotFound';
    }
}
