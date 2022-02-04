import NuageError from '../NuageError';

export default class SecurityRuleAccessForbidden extends NuageError {
    constructor(args) {
        super(args, 'You are not allowed to manipulate security rules.');

        this.name = 'SecurityRuleAccessForbidden';
    }
}
