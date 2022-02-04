import { passwordCustomErrors } from '../errors/entitiesError';
import Controller from './Controller';
import { URL_PASSWORDS } from '../utils/urls';
import Password from '../entities/Password';
import Logger from '../utils/Logger';

export default class PasswordController extends Controller {
    constructor() {
        super();

        this.url = URL_PASSWORDS;
        this.customErrors = passwordCustomErrors;
    }

    post(entity = new Password()) {
        Logger.debug('PasswordController.post()', { entity });

        const { email, organization } = entity;

        // Required fields to create entity
        const required = { email, organization };

        return super.post(entity, required, Password);
    }
}
