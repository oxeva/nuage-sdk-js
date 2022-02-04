import NuageError from '../NuageError';

export default class SyntaxError extends NuageError {
    constructor(args) {
        super(args, 'Invalid input.');

        this.name = 'SyntaxError';
    }
}
