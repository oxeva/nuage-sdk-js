import { roleCustomErrors } from '../errors/entitiesError';
import Controller from './Controller';
import { URL_ROLES } from '../utils/urls';

export default class RoleController extends Controller {
    constructor() {
        super();

        this.url = URL_ROLES;
        this.customErrors = roleCustomErrors;
    }
}
