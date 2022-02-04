import NuageError from '../NuageError';

export default class ProjectAccessForbidden extends NuageError {
    constructor(args) {
        super(args, 'You are not allowed to manipulate projects.');

        this.name = 'ProjectAccessForbidden';
    }
}
