import NuageError from './NuageError';

export default class NuageRateLimitError extends NuageError {
    constructor(args) {
        super(args, 'Too many requests in a given amount of time.');

        this.name = 'NuageRateLimitError';
    }
}
