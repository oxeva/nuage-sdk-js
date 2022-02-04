import { serverCustomErrors } from '../errors/entitiesError';
import Controller from './Controller';
import {
    URL_SERVERS,
    URL_FLAVORS,
    URL_IMAGES,
    URL_PROJECTS,
    URL_SECURITY_GROUPS,
} from '../utils/urls';
import Logger from '../utils/Logger';
import Server from '../entities/Server';

export default class ServerController extends Controller {
    constructor() {
        super();

        this.url = URL_SERVERS;
        this.customErrors = serverCustomErrors;
    }

    post(entity = new Server()) {
        Logger.debug('ServerController.post()', { entity });

        const {
            name,
            description,
            keypair,
            flavor,
            image,
            project,
            securityGroups,
        } = entity;

        // Required fields to create entity
        const required = {
            name,
            description,
            keypair,
            flavor: (flavor ? `${URL_FLAVORS}/` : '') + flavor,
            image: (image ? `${URL_IMAGES}/` : '') + image,
            project: (project ? `${URL_PROJECTS}/` : '') + project,
            securityGroups: securityGroups.map(
                (group) => `${URL_SECURITY_GROUPS}/${group}`,
            ),
        };

        return super.post(entity, required, Server);
    }
}
