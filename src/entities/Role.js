import { roleCustomErrors } from '../errors/entitiesError';
import Logger from '../utils/Logger';
import { URL_ROLES } from '../utils/urls';
import Entity from './Entity';

export default class Role extends Entity {
    constructor(entity = {}) {
        super();

        Logger.debug('Role.constructor()', { entity });

        const { name } = entity;

        this.name = name;

        this.className = 'Role';
        this.url = URL_ROLES;
        this.customErrors = roleCustomErrors;
        this.original = { ...this };
    }
}
