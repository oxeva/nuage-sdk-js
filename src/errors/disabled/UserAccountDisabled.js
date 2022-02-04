import NuageError from '../NuageError';

export default class UserAccountDisabled extends NuageError {
    constructor(args) {
        super(args, 'User account disabled. Please report to your admin.');

        this.name = 'UserAccountDisabled';
    }
}
