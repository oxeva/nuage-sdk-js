import NuageError from '../NuageError';

export default class RoleAccessForbidden extends NuageError {
    constructor(args) {
        super(args, 'You are not allowed to manipulate roles.');

        this.name = 'RoleAccessForbidden';
    }
}
