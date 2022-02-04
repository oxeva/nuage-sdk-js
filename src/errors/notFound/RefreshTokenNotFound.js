import NuageError from '../NuageError';

export default class RefreshTokenNotFound extends NuageError {
    constructor(args) {
        super(args, 'Your refresh token is invalid or expired.');

        this.name = 'RefreshTokenNotFound';
    }
}
