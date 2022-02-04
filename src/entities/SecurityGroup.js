import { securityGroupCustomErrors } from '../errors/entitiesError';
import Logger from '../utils/Logger';
import trimUrl from '../utils/trimUrl';
import { URL_SECURITY_GROUPS } from '../utils/urls';
import Entity from './Entity';
import SecurityRule from './SecurityRule';

export default class SecurityGroup extends Entity {
    constructor(entity = {}) {
        super();

        Logger.debug('SecurityGroup.constructor()', { entity });

        const {
            id, name, description, rules = [],
        } = entity;

        this.id = trimUrl(id);
        this.description = description;
        this.name = name;
        this.rules = Array.isArray(rules)
            ? rules.map((rule) => new SecurityRule(rule))
            : [rules];

        this.className = 'SecurityGroup';
        this.url = URL_SECURITY_GROUPS;
        this.customErrors = securityGroupCustomErrors;
        this.original = { ...this };
    }
}
