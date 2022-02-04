import { contractCustomErrors } from '../errors/entitiesError';
import Logger from '../utils/Logger';
import trimUrl from '../utils/trimUrl';
import { URL_CONTRACTS } from '../utils/urls';
import Entity from './Entity';

export default class Contract extends Entity {
    constructor(entity = {}) {
        super();

        Logger.debug('Contract.constructor()', { entity });

        const {
            id, content, revision, activeAt, createdAt, description,
        } = entity;

        this.id = trimUrl(id);
        this.content = content;
        this.revision = revision;
        this.activeAt = activeAt;
        this.createdAt = createdAt;
        this.description = description;

        this.className = 'Contract';
        this.url = URL_CONTRACTS;
        this.customErrors = contractCustomErrors;
        this.original = { ...this };
    }
}
