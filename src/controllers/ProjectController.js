import { projectCustomErrors } from '../errors/entitiesError';
import Controller from './Controller';
import { URL_PROJECTS, URL_ORGANIZATIONS } from '../utils/urls';
import Project from '../entities/Project';
import Logger from '../utils/Logger';

export default class ProjectController extends Controller {
    constructor() {
        super();

        this.url = URL_PROJECTS;
        this.customErrors = projectCustomErrors;
    }

    post(entity = new Project()) {
        Logger.debug('ProjectController.post()', { entity });

        const { description, organization } = entity;

        // Required fields to create entity
        const required = {
            description,
            organization:
                (organization ? `${URL_ORGANIZATIONS}/` : '') + organization,
        };

        return super.post(entity, required, Project);
    }
}
