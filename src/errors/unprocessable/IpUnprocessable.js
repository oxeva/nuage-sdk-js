import UnprocessableError from './UnprocessableError';

export default class IpUnprocessable extends UnprocessableError {
    constructor(args) {
        super(args);

        this.name = 'IpUnprocessable';
    }
}
