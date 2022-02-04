import NuageError from '../NuageError';

export default class SecurityGroupAccessForbidden extends NuageError {
    constructor(args) {
        super(args, 'You are not allowed to manipulate security groups.');

        this.name = 'SecurityGroupAccessForbidden';
    }
}
