import { projectCustomErrors } from '../errors/entitiesError';
import Logger from '../utils/Logger';
import trimUrl from '../utils/trimUrl';
import { URL_PROJECTS } from '../utils/urls';
import Entity from './Entity';

export default class Project extends Entity {
    constructor(entity = {}) {
        super();

        Logger.debug('Project.constructor()', { entity });

        const {
            id, name, createdAt, description, driverType, organization,
        } = entity;

        this.id = trimUrl(id);
        this.createdAt = createdAt;
        this.description = description;
        this.driverType = driverType;
        this.name = name;
        this.organization = trimUrl(organization);

        this.className = 'Project';
        this.url = URL_PROJECTS;
        this.customErrors = projectCustomErrors;
        this.original = { ...this };
    }

    flush() {
        Logger.debug('Project.flush()');

        const options = {
            description: this.description,
        };

        return super.flush(options, 'patch');
    }
}
