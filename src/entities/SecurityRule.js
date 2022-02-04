import { securityRuleCustomErrors } from '../errors/entitiesError';
import Logger from '../utils/Logger';
import trimUrl from '../utils/trimUrl';
import { URL_SECURITY_RULES } from '../utils/urls';
import Entity from './Entity';

export default class SecurityRule extends Entity {
    constructor(entity = {}) {
        super();

        Logger.debug('SecurityRule.constructor()', { entity });

        const {
            id,
            direction,
            protocol,
            ethertype,
            portMin,
            portMax,
            remote,
            group,
        } = entity;

        this.id = trimUrl(id);
        this.direction = direction;
        this.ethertype = ethertype;
        this.group = trimUrl(group);
        this.portMax = portMax;
        this.portMin = portMin;
        this.protocol = protocol;
        this.remote = remote;

        this.className = 'SecurityRule';
        this.url = URL_SECURITY_RULES;
        this.customErrors = securityRuleCustomErrors;
        this.original = { ...this };
    }
}
