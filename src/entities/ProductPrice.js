import { productPriceCustomErrors } from '../errors/entitiesError';
import Logger from '../utils/Logger';
import trimUrl from '../utils/trimUrl';
import { URL_PRODUCT_PRICES } from '../utils/urls';
import Entity from './Entity';

export default class ProductPrice extends Entity {
    constructor(entity = {}) {
        super();

        Logger.debug('ProductPrice.constructor()', { entity });

        const {
            id,
            createdAt,
            currency,
            product,
            valueOn,
            valueOff,
            validFrom,
            validTo,
        } = entity;

        this.id = trimUrl(id);
        this.createdAt = createdAt;
        this.currency = currency;
        this.product = product;
        this.valueOn = valueOn;
        this.valueOff = valueOff;
        this.validFrom = validFrom;
        this.validTo = validTo;

        this.className = 'ProductPrice';
        this.url = URL_PRODUCT_PRICES;
        this.customErrors = productPriceCustomErrors;
        this.original = { ...this };
    }
}
