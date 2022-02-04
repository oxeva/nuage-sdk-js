import NuageError from '../NuageError';

export default class InvitationAccessForbidden extends NuageError {
    constructor(args) {
        super(args, 'You are not allowed to manipulate invitations.');

        this.name = 'InvitationAccessForbidden';
    }
}
