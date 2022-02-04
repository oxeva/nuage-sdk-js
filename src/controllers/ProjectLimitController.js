import { projectLimitCustomErrors } from '../errors/entitiesError';
import Controller from './Controller';
import { URL_PROJECT_LIMITS } from '../utils/urls';
import ProjectLimit from '../entities/ProjectLimit';
import Logger from '../utils/Logger';

export default class ProjectLimitController extends Controller {
    constructor() {
        super();

        this.url = URL_PROJECT_LIMITS;
        this.customErrors = projectLimitCustomErrors;
    }

    post(entity = new ProjectLimit()) {
        Logger.debug('ProjectLimitController.post()', { entity });

        const { resource, limit } = entity;

        // Required fields to create entity
        const required = { resource, limit };

        return super.post(entity, required, ProjectLimit);
    }
}
