import { userCustomErrors } from '../errors/entitiesError';
import Controller from './Controller';
import { URL_ORGANIZATIONS, URL_USERS } from '../utils/urls';
import Logger from '../utils/Logger';
import User from '../entities/User';

export default class UserController extends Controller {
    constructor() {
        super();

        this.url = URL_USERS;
        this.customErrors = userCustomErrors;
    }

    post(entity = new User()) {
        Logger.debug('UserController.post()', { entity });

        const {
            name, email, password, organization,
        } = entity;

        // Required fields to create entity
        const required = {
            name,
            email,
            password,
            organization:
                (organization ? `${URL_ORGANIZATIONS}/` : '') + organization,
        };

        return super.post(entity, required, User);
    }
}
