import NuageError from '../NuageError';

export default class SponsorshipAccessForbidden extends NuageError {
    constructor(args) {
        super(args, 'You are not allowed to manipulate sponsorships.');

        this.name = 'SponsorshipAccessForbidden';
    }
}
