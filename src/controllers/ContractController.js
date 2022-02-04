import { contractCustomErrors } from '../errors/entitiesError';
import Controller from './Controller';
import { URL_CONTRACTS } from '../utils/urls';
import Logger from '../utils/Logger';
import Contract from '../entities/Contract';

export default class ContractController extends Controller {
    constructor() {
        super();

        this.url = URL_CONTRACTS;

        this.customErrors = contractCustomErrors;
    }

    post(entity = new Contract()) {
        Logger.debug('ContractController.post()', entity);

        const { revision, content } = entity;

        const required = { revision, content };

        return super.post(entity, required, Contract);
    }
}
