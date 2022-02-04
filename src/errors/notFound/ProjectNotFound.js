import NuageError from '../NuageError';

export default class ProjectNotFound extends NuageError {
    constructor(args) {
        super(args, 'Your project does not exists.');

        this.name = 'ProjectNotFound';
    }
}
