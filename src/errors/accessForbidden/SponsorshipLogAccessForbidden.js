import NuageError from '../NuageError';

export default class SponsorshipLogAccessForbidden extends NuageError {
    constructor(args) {
        super(args, 'You are not allowed to manipulate sponsorshiplogs.');

        this.name = 'SponsorshipLogAccessForbidden';
    }
}
