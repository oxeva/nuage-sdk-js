import NuageError from '../NuageError';

export default class ServerAccessForbidden extends NuageError {
    constructor(args) {
        super(args, 'You are not allowed to manipulate servers.');

        this.name = 'ServerAccessForbidden';
    }
}
