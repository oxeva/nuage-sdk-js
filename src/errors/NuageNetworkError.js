import NuageError from './NuageError';

export default class NuageNetworkError extends NuageError {
    constructor(args) {
        super(args, 'Network error.');

        this.name = 'NuageNetworkError';
    }
}
