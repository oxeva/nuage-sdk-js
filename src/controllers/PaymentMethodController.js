import { paymentMethodCustomErrors } from '../errors/entitiesError';
import Controller from './Controller';
import { URL_PAYMENT_METHODS } from '../utils/urls';
import Logger from '../utils/Logger';
import PaymentMethod from '../entities/PaymentMethod';

export default class PaymentMethodController extends Controller {
    constructor() {
        super();

        this.url = URL_PAYMENT_METHODS;
        this.customErrors = paymentMethodCustomErrors;
    }

    post(entity = new PaymentMethod()) {
        Logger.debug('PaymentMethodController.post()', { entity });

        const { type } = entity;

        // Required fields to create entity
        const required = { type };

        return super.post(entity, required, PaymentMethod);
    }
}
