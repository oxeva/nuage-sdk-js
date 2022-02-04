import { organizationLimitCustomErrors } from '../errors/entitiesError';
import Logger from '../utils/Logger';
import trimUrl from '../utils/trimUrl';
import { URL_ORGANIZATION_LIMITS } from '../utils/urls';
import Entity from './Entity';

export default class OrganizationLimit extends Entity {
    constructor(entity = {}) {
        super();

        Logger.debug('OrganizationLimit.constructor()', { entity });

        const {
            id, organization, resource, limit,
        } = entity;

        this.id = trimUrl(id);
        this.limit = limit;
        this.organization = trimUrl(organization);
        this.resource = resource;

        this.className = 'OrganizationLimit';
        this.url = URL_ORGANIZATION_LIMITS;
        this.customErrors = organizationLimitCustomErrors;
        this.original = { ...this };
    }
}
