import NuageError from '../NuageError';

export default class SponsorshipNotFound extends NuageError {
    constructor(args) {
        super(args, 'Your sponsorship does not exists.');

        this.name = 'SponsorshipNotFound';
    }
}
