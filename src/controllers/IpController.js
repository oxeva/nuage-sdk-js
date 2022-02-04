import { ipCustomErrors } from '../errors/entitiesError';
import Controller from './Controller';
import { URL_IPS, URL_SERVERS } from '../utils/urls';
import Ip from '../entities/Ip';
import Logger from '../utils/Logger';

export default class IpController extends Controller {
    constructor() {
        super();

        this.url = URL_IPS;
        this.customErrors = ipCustomErrors;
    }

    post(entity = new Ip()) {
        Logger.debug('IpController.post()', { entity });

        const { server, addressFamily, type } = entity;

        // Required fields to create entity
        const required = {
            addressFamily,
            type,
            server: (server ? `${URL_SERVERS}/` : '') + server,
        };

        return super.post(entity, required, Ip);
    }
}
