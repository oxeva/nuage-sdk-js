import { passwordCustomErrors } from '../errors/entitiesError';
import Logger from '../utils/Logger';
import trimUrl from '../utils/trimUrl';
import { URL_PASSWORDS } from '../utils/urls';
import Entity from './Entity';

export default class Password extends Entity {
    constructor(entity = {}) {
        super();

        Logger.debug('Password.constructor()', { entity });

        const {
            id, email, organization, password,
        } = entity;

        this.id = trimUrl(id);
        this.email = email;
        this.organization = organization;
        this.password = password;

        this.className = 'Password';
        this.url = URL_PASSWORDS;
        this.customErrors = passwordCustomErrors;
        this.original = { ...this };
    }

    flush() {
        Logger.debug('Password.flush()');

        const options = {
            password: this.password,
        };

        return super.flush(options, 'patch');
    }
}
