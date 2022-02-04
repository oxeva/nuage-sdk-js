import { organizationCustomErrors } from '../errors/entitiesError';
import Logger from '../utils/Logger';
import trimUrl from '../utils/trimUrl';
import { URL_ORGANIZATIONS } from '../utils/urls';
import Entity from './Entity';

export default class Organization extends Entity {
    constructor(entity = {}) {
        super();

        Logger.debug('Organization.constructor()', { entity });

        const {
            id, name, description, state, createdAt, sponsorship,
        } = entity;

        this.id = trimUrl(id);
        this.description = description;
        this.name = name;
        this.state = state;
        this.createdAt = createdAt;
        this.sponsorship = sponsorship;

        this.className = 'Organization';
        this.url = URL_ORGANIZATIONS;
        this.customErrors = organizationCustomErrors;
        this.original = { ...this };
    }
}
