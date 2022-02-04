import { couponCustomErrors } from '../errors/entitiesError';
import Logger from '../utils/Logger';
import { URL_COUPONS } from '../utils/urls';
import Entity from './Entity';

export default class Coupon extends Entity {
    constructor(entity = {}) {
        super();

        Logger.debug('Coupon.constructor()', { entity });

        const {
            name, value, currency, validUntil, isUsed,
        } = entity;

        this.name = name;
        this.value = value;
        this.currency = currency;
        this.validUntil = validUntil;
        this.isUsed = isUsed;

        this.className = 'Coupon';
        this.url = URL_COUPONS;
        this.customErrors = couponCustomErrors;
        this.original = { ...this };
    }
}
