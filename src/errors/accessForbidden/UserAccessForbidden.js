import NuageError from '../NuageError';

export default class UserAccessForbidden extends NuageError {
    constructor(args) {
        super(args, 'You are not allowed to manipulate users.');

        this.name = 'UserAccessForbidden';
    }
}
