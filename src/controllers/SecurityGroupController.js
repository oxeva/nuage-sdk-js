import { securityGroupCustomErrors } from '../errors/entitiesError';
import Controller from './Controller';
import { URL_SECURITY_GROUPS } from '../utils/urls';
import Logger from '../utils/Logger';
import SecurityGroup from '../entities/SecurityGroup';

export default class SecurityGroupController extends Controller {
    constructor() {
        super();

        this.url = URL_SECURITY_GROUPS;
        this.customErrors = securityGroupCustomErrors;
    }

    post(entity = new SecurityGroup()) {
        Logger.debug('SecurityGroupController.post()', { entity });

        const { description } = entity;

        // Required fields to create entity
        const required = { description };

        return super.post(entity, required, SecurityGroup);
    }
}
