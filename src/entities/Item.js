import { itemCustomErrors } from '../errors/entitiesError';
import Logger from '../utils/Logger';
import trimUrl from '../utils/trimUrl';
import { URL_ITEMS } from '../utils/urls';
import Entity from './Entity';

export default class Item extends Entity {
    constructor(entity = {}) {
        super();

        Logger.debug('Item.constructor()', { entity });

        const {
            description, externalId, id, name, type,
        } = entity;

        this.id = trimUrl(id);
        this.description = description;
        this.externalId = externalId;
        this.name = name;
        this.type = type;

        this.className = 'Item';
        this.url = URL_ITEMS;
        this.customErrors = itemCustomErrors;
        this.original = { ...this };
    }
}
