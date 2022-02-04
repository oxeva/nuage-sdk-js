import { organizationLimitCustomErrors } from '../errors/entitiesError';
import Controller from './Controller';
import { URL_ORGANIZATION_LIMITS } from '../utils/urls';

export default class OrganizationLimitController extends Controller {
    constructor() {
        super();

        this.url = URL_ORGANIZATION_LIMITS;
        this.customErrors = organizationLimitCustomErrors;
    }
}
