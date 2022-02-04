import { couponCustomErrors } from '../errors/entitiesError';
import Controller from './Controller';
import { URL_COUPONS } from '../utils/urls';
import Coupon from '../entities/Coupon';
import Logger from '../utils/Logger';

export default class CouponController extends Controller {
    constructor() {
        super();

        this.url = URL_COUPONS;
        this.customErrors = couponCustomErrors;
    }

    post(entity = new Coupon()) {
        Logger.debug('CouponController.post()', entity);

        const { name, description, value } = entity;

        // Required fields to create entity
        const required = {
            name,
            description,
            value,
        };

        return super.post(entity, required, Coupon);
    }
}
