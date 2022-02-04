import NuageError from '../NuageError';

export default class MetricAccessForbidden extends NuageError {
    constructor(args) {
        super(args, 'You are not allowed to manipulate metrics.');

        this.name = 'MetricAccessForbidden';
    }
}
