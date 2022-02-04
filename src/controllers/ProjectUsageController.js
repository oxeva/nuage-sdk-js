import { projectUsageCustomErrors } from '../errors/entitiesError';
import Controller from './Controller';
import { URL_PROJECTS_USAGES } from '../utils/urls';

export default class ProjectUsageController extends Controller {
    constructor() {
        super();

        this.url = URL_PROJECTS_USAGES;
        this.customErrors = projectUsageCustomErrors;
    }
}
