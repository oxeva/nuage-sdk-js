import { userCustomErrors } from '../errors/entitiesError';
import Logger from '../utils/Logger';
import trimUrl from '../utils/trimUrl';
import { URL_USERS } from '../utils/urls';
import Entity from './Entity';
import Role from './Role';

export default class User extends Entity {
    constructor(entity = {}) {
        super();

        Logger.debug('User.constructor()', { entity });

        const {
            id,
            roles = [],
            createdAt,
            firstname,
            lastname,
            lastLogin,
            name,
            email,
            password,
            enabled,
            sponsorCode,
        } = entity;

        this.id = trimUrl(id);
        this.createdAt = createdAt;
        this.email = email;
        this.firstname = firstname;
        this.lastLogin = lastLogin;
        this.lastname = lastname;
        this.name = name;
        this.password = password;
        this.roles = roles.map((role) => new Role(role));
        this.enabled = enabled;
        this.sponsorCode = sponsorCode;

        this.className = 'User';
        this.url = URL_USERS;
        this.customErrors = userCustomErrors;
        this.original = { ...this };
    }

    #flushRole() {
        Logger.debug('User.flushRole()');

        const method = this.roles.length ? 'delete' : 'post';

        this.promise = this.Request[method](
            `${URL_USERS}/${this.id}/roles/admin`,
        ).then(({ response }) => {
            // Get custom error
            const error = (response?.status
                    && userCustomErrors?.[response.status]
                    && new userCustomErrors[response.status](response))
                || false;

            if (error) {
                throw error;
            }

            return { error, data: this };
        });

        return this;
    }

    flush() {
        Logger.debug('User.flush()');

        if (this.changeRole) {
            return this.#flushRole();
        }

        return super.flush(null, 'patch');
    }
}
