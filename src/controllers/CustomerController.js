import { customerCustomErrors } from '../errors/entitiesError';
import Controller from './Controller';
import { URL_CUSTOMERS } from '../utils/urls';
import Logger from '../utils/Logger';
import Customer from '../entities/Customer';

export default class CustomerController extends Controller {
    constructor() {
        super();

        this.url = URL_CUSTOMERS;
        this.customErrors = customerCustomErrors;
    }

    #postContract(id, contract) {
        Logger.debug('CustomerController.#postContract()', { id, contract });

        const url = `${this.url}/${id}/contract/${contract}`;

        this.promise = this.Request.post(url, null).then(({ response }) => {
            // Get custom error
            const error = this.getError(response);

            return { data: undefined, error };
        });

        return this;
    }

    post(entity = new Customer()) {
        Logger.debug('CustomerController.post()', entity);

        const { id, customerContracts } = entity;

        const [contractToSign] = customerContracts
            ?.filter((contract) => !('acceptedAt' in contract))
            ?.map(({ contract }) => contract) || [];

        return this.#postContract(id, contractToSign);
    }
}
