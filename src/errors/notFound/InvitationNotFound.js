import NuageError from '../NuageError';

export default class InvitationNotFound extends NuageError {
    constructor(args) {
        super(args, 'Your invitation does not exists.');

        this.name = 'InvitationNotFound';
    }
}
