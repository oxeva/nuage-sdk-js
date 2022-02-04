import NuageError from '../NuageError';

export default class SponsorshipLogNotFound extends NuageError {
    constructor(args) {
        super(args, 'Your sponsorship log does not exists.');

        this.name = 'SponsorshipLogNotFound';
    }
}
