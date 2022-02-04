import { flavorCustomErrors } from '../errors/entitiesError';
import Logger from '../utils/Logger';
import trimUrl from '../utils/trimUrl';
import { URL_FLAVORS } from '../utils/urls';
import Entity from './Entity';

export default class Flavor extends Entity {
    constructor(entity = {}) {
        super();

        Logger.debug('Flavor.constructor()', { entity });

        const {
            id, name, ram, core, disk, isPublic = true,
        } = entity;

        this.id = trimUrl(id);
        this.core = core;
        this.disk = disk;
        this.isPublic = isPublic;
        this.name = name;
        this.ram = ram;

        this.className = 'Flavor';
        this.url = URL_FLAVORS;
        this.customErrors = flavorCustomErrors;
        this.original = { ...this };
    }
}
