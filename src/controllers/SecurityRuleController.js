import { securityRuleCustomErrors } from '../errors/entitiesError';
import Controller from './Controller';
import { URL_SECURITY_RULES, URL_SECURITY_GROUPS } from '../utils/urls';
import Logger from '../utils/Logger';
import SecurityRule from '../entities/SecurityRule';

export default class SecurityRuleController extends Controller {
    constructor() {
        super();

        this.url = URL_SECURITY_RULES;
        this.customErrors = securityRuleCustomErrors;
    }

    post(entity = new SecurityRule()) {
        Logger.debug('SecurityRuleController.post()', { entity });

        const {
            group,
            direction,
            protocol,
            ethertype,
            portMin,
            portMax,
            remote,
        } = entity;

        // Required fields to create entity
        const required = {
            direction,
            protocol,
            ethertype,
            portMin,
            portMax,
            remote,
            group: (group ? `${URL_SECURITY_GROUPS}/` : '') + group,
        };

        return super.post(entity, required, SecurityRule);
    }
}
