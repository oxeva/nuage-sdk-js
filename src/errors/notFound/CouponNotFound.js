import NuageError from '../NuageError';

export default class CouponNotFound extends NuageError {
    constructor(args) {
        super(args, 'Your coupon does not exists.');

        this.name = 'CouponNotFound';
    }
}
