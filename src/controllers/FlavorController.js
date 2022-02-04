import { flavorCustomErrors } from '../errors/entitiesError';
import Controller from './Controller';
import { URL_FLAVORS } from '../utils/urls';
import Logger from '../utils/Logger';
import Flavor from '../entities/Flavor';

export default class FlavorController extends Controller {
    constructor() {
        super();

        this.url = URL_FLAVORS;
        this.customErrors = flavorCustomErrors;
    }

    post(entity = new Flavor()) {
        Logger.debug('FlavorController.post()', { entity });

        const {
            name, ram, core, disk,
        } = entity;

        // Required fields to create entity
        const required = {
            name,
            ram,
            core,
            disk,
        };

        return super.post(entity, required, Flavor);
    }
}
