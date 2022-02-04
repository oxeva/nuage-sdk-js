import { keypairCustomErrors } from '../errors/entitiesError';
import Controller from './Controller';
import { URL_KEYPAIRS, URL_USERS } from '../utils/urls';
import Keypair from '../entities/Keypair';
import Logger from '../utils/Logger';

export default class KeypairController extends Controller {
    constructor() {
        super();

        this.url = URL_KEYPAIRS;
        this.customErrors = keypairCustomErrors;
    }

    post(entity = new Keypair()) {
        Logger.debug('KeypairController.post()', { entity });

        const { user, publicKey, isDefault } = entity;

        // Required fields to create entity
        const required = {
            publicKey,
            isDefault,
            user: (user ? `${URL_USERS}/` : '') + user,
        };

        return super.post(entity, required, Keypair);
    }
}
