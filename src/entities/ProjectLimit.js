import { projectLimitCustomErrors } from '../errors/entitiesError';
import Logger from '../utils/Logger';
import trimUrl from '../utils/trimUrl';
import { URL_PROJECT_LIMITS } from '../utils/urls';
import Entity from './Entity';

export default class ProjectLimit extends Entity {
    constructor(entity = {}) {
        super();

        Logger.debug('ProjectLimit.constructor()', { entity });

        const {
            id, target, scope, resource, limit,
        } = entity;

        this.id = trimUrl(id);
        this.target = trimUrl(target);
        this.scope = scope;
        this.limit = limit;
        this.resource = resource;

        this.className = 'ProjectLimit';
        this.url = URL_PROJECT_LIMITS;
        this.customErrors = projectLimitCustomErrors;
        this.original = { ...this };
    }
}
