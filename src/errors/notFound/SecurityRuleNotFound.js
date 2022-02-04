import NuageError from '../NuageError';

export default class SecurityRuleNotFound extends NuageError {
    constructor(args) {
        super(args, 'Your security rule does not exists.');

        this.name = 'SecurityRuleNotFound';
    }
}
