import NuageError from '../NuageError';

export default class RoleNotFound extends NuageError {
    constructor(args) {
        super(args, 'Your role does not exists.');

        this.name = 'RoleNotFound';
    }
}
