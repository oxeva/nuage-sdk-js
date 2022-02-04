import NuageError from '../NuageError';

export default class IpAccessForbidden extends NuageError {
    constructor(args) {
        super(args, 'You are not allowed to manipulate IP.');

        this.name = 'IpAccessForbidden';
    }
}
