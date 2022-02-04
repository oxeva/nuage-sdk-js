import NuageError from '../NuageError';

export default class SecurityGroupNotFound extends NuageError {
    constructor(args) {
        super(args, 'Your security group does not exists.');

        this.name = 'SecurityGroupNotFound';
    }
}
