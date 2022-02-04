import { customerCustomErrors } from '../errors/entitiesError';
import Logger from '../utils/Logger';
import trimUrl from '../utils/trimUrl';
import { URL_CUSTOMERS, URL_PAYMENT_METHODS } from '../utils/urls';
import Entity from './Entity';

export default class Customer extends Entity {
    constructor(entity = {}) {
        super();

        Logger.debug('Customer.constructor()', { entity });

        const {
            id,
            state,
            address,
            vat,
            email,
            name,
            phone,
            currency,
            delinquent,
            balance,
            defaultPaymentMethod,
            vatRate,
            organizationId,
            coupon,
        } = entity;

        const customerContracts = entity.customerContracts?.map(
            (customerContract) => ({
                ...customerContract,
                acceptedBy: trimUrl(customerContract.acceptedBy),
                contract: trimUrl(customerContract.contract),
            }),
        );

        this.id = trimUrl(id);
        this.state = state;
        this.address = address;
        this.vat = vat;
        this.email = email;
        this.name = name;
        this.phone = phone;
        this.currency = currency;
        this.delinquent = delinquent;
        this.defaultPaymentMethod = defaultPaymentMethod;
        this.customerContracts = customerContracts;
        this.balance = balance;
        this.vatRate = vatRate;
        this.organizationId = organizationId;
        this.coupon = coupon;

        this.className = 'Customer';
        this.url = URL_CUSTOMERS;
        this.customErrors = customerCustomErrors;
        this.original = { ...this };
    }

    flush() {
        Logger.debug('Customer.flush()');

        let options = null;

        if (typeof this.defaultPaymentMethod === 'string') {
            options = {
                defaultPaymentMethod: `${URL_PAYMENT_METHODS}/${this.defaultPaymentMethod}`,
            };
        }

        return super.flush(options, 'patch');
    }
}
