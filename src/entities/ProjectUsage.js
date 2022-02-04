import { projectUsageCustomErrors } from '../errors/entitiesError';
import Logger from '../utils/Logger';
import trimUrl from '../utils/trimUrl';
import { URL_PROJECTS_USAGES } from '../utils/urls';
import Entity from './Entity';

export default class ProjectUsage extends Entity {
    constructor(entity = {}) {
        super();

        Logger.debug('ProjectUsage.constructor()', { entity });

        const { project, resource, value } = entity;

        this.project = trimUrl(project);
        this.resource = resource;
        this.value = value;

        this.className = 'ProjectUsage';
        this.url = URL_PROJECTS_USAGES;
        this.customErrors = projectUsageCustomErrors;
        this.original = { ...this };
    }
}
