import { paymentMethodCustomErrors } from '../errors/entitiesError';
import Logger from '../utils/Logger';
import trimUrl from '../utils/trimUrl';
import { URL_PAYMENT_METHODS } from '../utils/urls';
import Entity from './Entity';

export default class PaymentMethod extends Entity {
    constructor(entity = {}) {
        super();

        Logger.debug('PaymentMethod.constructor()', { entity });

        const {
            card, clientSecret, createdAt, id, state, type,
        } = entity;

        this.card = card;
        this.clientSecret = clientSecret;
        this.createdAt = createdAt;
        this.id = trimUrl(id);
        this.state = state;
        this.type = type;

        this.className = 'PaymentMethod';
        this.url = URL_PAYMENT_METHODS;
        this.customErrors = paymentMethodCustomErrors;
        this.original = { ...this };
    }
}
