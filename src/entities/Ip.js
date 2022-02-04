import { ipCustomErrors } from '../errors/entitiesError';
import Logger from '../utils/Logger';
import trimUrl from '../utils/trimUrl';
import { URL_IPS } from '../utils/urls';
import Entity from './Entity';

export default class Ip extends Entity {
    constructor(entity = {}) {
        super();

        Logger.debug('Ip.constructor()', { entity });

        const {
            id, project, server, addressFamily, type, address,
        } = entity;

        this.id = trimUrl(id);
        this.address = address;
        this.addressFamily = addressFamily;
        this.project = trimUrl(project);
        this.server = trimUrl(server);
        this.type = type;

        this.className = 'Ip';
        this.url = URL_IPS;
        this.customErrors = ipCustomErrors;
        this.original = { ...this };
    }
}
